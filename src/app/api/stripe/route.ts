import { PLANS } from "@/config/stripe";
import { db } from "@/db";
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const billingUrl = absoluteUrl("/dashboard/billing");

  if (!user?.id) return new NextResponse("UNAUTHORIZED", { status: 400 });

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) return new NextResponse("UNAUTHORIZED", { status: 400 });
  
  const subscriptionPlan = await getUserSubscriptionPlan()

  if(subscriptionPlan.isSubscribed && dbUser.stripeCustomerId){
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer:dbUser.stripeCustomerId,
      return_url:billingUrl
    })
    return NextResponse.json({url :stripeSession.url})
}

  const stripeSession = await stripe.checkout.sessions.create({
    success_url:billingUrl,
    cancel_url:billingUrl,
    payment_method_types:['card','paypal'],
    mode:'subscription',
    billing_address_collection:'auto',
    line_items:[
      {
        price:PLANS.find((plan)=> plan.name==="Pro")?.price.priceId.test,
        quantity:1
      }
    ],
    metadata:{
      userId:user.id
    }
  })

  return NextResponse.json({url:stripeSession.url||""})


};
