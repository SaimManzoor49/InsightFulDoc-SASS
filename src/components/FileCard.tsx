'use client'
import { File } from '@prisma/client'
import { format } from 'date-fns'
import { MessageSquare, Plus, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
interface FileCardProps{
    file:File
}

const FileCard = ({file}:FileCardProps) => {

    const handleDelete = async(id:string,userId:string)=>{

        // if(userId === user.id){
        //   try {
        //     await db.file.delete({
        //       where:{
        //         id,
                
        //       }
        //     })
        //     toast.success("File deleted.")
        //   } catch (error:any) {
        //     toast.error("Something went wrong.")
        //     console.log(error?.message)
        //   }
        // }else{
        //   toast.error("Unauthorized.")
        // }
        toast.error("elo")
      }


  return (
    <li key={file.id} className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'>
    <Link href={`/dashboard/${file.id}`} className='flex flex-col gap-2'>
      <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
        <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' />
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className='truncate text-lg font-medium text-zinc-900'>{file.name}</h3>
          </div>
        </div>
      </div>
    </Link>
    <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
      <div className="flex items-center gap-2 ">
        <Plus className='h-4 w-4' />
        {format(new Date(file.createdAt),"MMM yyyy")}
        </div>
    <div className="flex items-center gap-2 ">
      <MessageSquare className='h-4 w-4' />
      mocked
    </div>
    <Button size={'sm'} className='w-full' variant={'destructive'} onClick={()=>{handleDelete(file.id,file.userId)}}>
      <TrashIcon className='h-4 w-4' />
    </Button>
    </div>
  </li>
  )
}

export default FileCard