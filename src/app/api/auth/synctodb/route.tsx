import { NextApiRequest } from "next";
import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server'
import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET(reques:NextApiRequest) {
    console.log("Ello <- api")
    
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(user && user.id && user.email){

        
        const dbUser = await db.user.findFirst({
            where: {
              id: user.id,
            },
          })
        if(dbUser){
            console.log("User")
            // return NextResponse.json({user:dbUser,message:"user already Synced"})
        }else{
            console.log(" No User")
            
        

        //     await db.user.create({
        //         data: {
        //             id: user.id,
        //             email: user.email,
        //         },
        //     })
        //     const dbUser = await db.user.create({ data:{id:user.id,email:user.email}})
            
        //     if(dbUser){

        //         return NextResponse.json({user:dbUser,message:"User is Synced"})
        //     }else{
                
                return NextResponse.json({user:null,message:'something went wrong'})
        //     }


        }
    
        
    }

}