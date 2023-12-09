import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import ChatInput from './ChatInput'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { File } from '@prisma/client'
import axios from 'axios'
import { ChevronLeft, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'



const ChatWrapper = async({ fileId,userId }: { fileId: string,userId:string }) => {
  
 const file = await db.file.findFirst({
  where:{
    id:fileId,
    userId
  }
 })

if(!file)
return (
  <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
    <div className="flex-1 flex justify-center items-center flex-col mb-28">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className='h-8 w-8 text-blue-500 animate-spin' />
        <h3 className='font-semibold text-xl'>Loading...</h3>
        <p className="text-zinc-500 text-sm">
          We&apos;re preparing your PDF
        </p>
      </div>
    </div>
    <ChatInput isDisabled />
  </div>
)


if(file?.uploadStatus==="PROCESSING"){
  return(
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
         <div className="flex-1 flex justify-center items-center flex-col mb-28">
           <div className="flex flex-col items-center gap-2">
             <Loader2 className='h-8 w-8 text-blue-500 animate-spin' />
             <h3 className='font-semibold text-xl'>Processing...</h3>
             <p className="text-zinc-500 text-sm">
              This won&apos;t take long.
             </p>
           </div>
         </div>
         <ChatInput isDisabled />
       </div>
  )
}

if(file?.uploadStatus==="FAILED"){
  return(
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
         <div className="flex-1 flex justify-center items-center flex-col mb-28">
           <div className="flex flex-col items-center gap-2">
             <XCircle className='h-8 w-8 text-red-500 ' />
             <h3 className='font-semibold text-xl'>Too many pages in PDF...</h3>
             <p className="text-zinc-500 text-sm">
              Your <span className='font-medium'>Free</span> plan supports upto 5 pages PDF.
             </p>
             <Link href={`/dashboard`} className={buttonVariants({variant:'secondary' })+" mt-4"}><ChevronLeft className='h-3 w-3 mr-1.5' /> Back</Link>
           </div>
         </div>
         <ChatInput isDisabled />
       </div>
  )  
  }



  return (
    <div className='relative min-g-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between ga-2'>
      <div className="flex-1 justify-between flex flex-col mb-28">
        <Messages />
      </div>

      <ChatInput isDisabled={false} />
    </div>
  )
}

export default ChatWrapper