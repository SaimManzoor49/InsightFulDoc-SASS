import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"

export const DELETE = async(req:Request,{params}:{params:{fileId:string}})=>{
try {
    
    
    const {getUser} = getKindeServerSession()    
    const user = await getUser();

    if(!user){
        return new NextResponse("User Not Found",{status:404})
    }

    const userId = await db.user.findUnique({
        where:{
            id:user.id
        },
        select:{
            id:true
        }
    })
    
    if(!userId)
        return new NextResponse("Unauthorized",{status:400})

    const delFile = await db.file.delete({
        where:{
            id:params.fileId,
        }
    }) 
    
    return NextResponse.json(delFile)

} catch (error) {
    console.log("FILE_DELETE_ERROR",error)
    return new NextResponse("Internal Server Error",{status:500})
    
}

}