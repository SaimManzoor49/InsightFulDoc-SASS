
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server";


export const GET = async (req: Request) => {

    const { getUser } = getKindeServerSession();
    const user = await getUser();


    if (user && user.id && user.email) {

        const dbUser = await db.user.findFirst({
            where: {
                id: user.id
            }
        })

        if (dbUser?.email) {
            return NextResponse.json(dbUser)
        } else {
            const newUser = await db.user.create({
                data: {
                    id: user.id,
                    email: user.email
                }
            })
            return NextResponse.json(newUser)
        }

    } else {
        return new NextResponse("Internal Sever Error",{status:500})
    }


}