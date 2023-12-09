import { db } from "@/db"
import { sendMessageValidator } from "@/lib/sendMessageValidator"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const POST = async(req:Request)=>{

    const body = await req.json()

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    const userId = user?.id

    if(!userId){
        return new Response("Unauthorized",{status:401})
    }

    const {fileId,message} = sendMessageValidator.parse(body)

    const file = await db.file.findFirst({
        where:{
            id:fileId,
            userId
        }
    })

    if(!file) return new Response("No file found",{status:404})

    await db.message.create({
        data:{
            text:message,
            isUserMessage:true,
            userId,
            fileId
        }
    })

}