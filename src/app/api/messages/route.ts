import { INFINITE_QUERY_LIMIT } from "@/constants/infinit-query";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const POST = async(req:Request) =>{

    try {

        const {fileId,cursor} =await req.json()
        console.log(fileId,cursor)
        
        const {getUser} = getKindeServerSession()
        const user = await getUser()

        if(!user || !user.id){
            return new NextResponse("User not found",{status:404})
        }

        const limit = INFINITE_QUERY_LIMIT; ///////////////////////// limiting


        const file =await db.file.findFirst({
            where:{
                id:fileId,
                userId:user.id
            }
        })

        if(!file){
            return new NextResponse("File not found",{status:404})
        }

        const messages = await db.message.findMany({
            where:{
                fileId:fileId
            },
            take:limit+1,
            orderBy:{
              createdAt:'desc'
            },
            cursor:cursor? {id:cursor}:undefined,
            select:{
                id:true,
                isUserMessage:true,
                createdAt:true,
                text:true,
            }
          })

          let nextCursor:typeof cursor | undefined = undefined
          if(messages.length>limit){
            const nextItem = messages.pop()
            nextCursor = nextItem?.id
          }

          return NextResponse.json({
            messages,
            nextCursor
          })


    } catch (error) {
        return new NextResponse("Internal Server Error",{status:500})
    }

}
    