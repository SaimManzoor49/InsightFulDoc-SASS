'use client'
import { File } from '@prisma/client'
import { format } from 'date-fns'
import { MessageSquare, Plus, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import {Loader} from 'lucide-react'
interface FileCardProps{
    file:File
}

const FileCard = ({file}:FileCardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  
    const handleDelete = async(id:string,userId:string)=>{

      try {
        setIsLoading(true)
        await axios.delete(`/api/files/${id}`)
        toast.success("File deleted.")
        router.refresh()
      } catch (error) {
        setIsLoading(false)
        toast.error("Something went wrong.")
      }finally{
        setIsLoading(false)
      }

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
    <Button size={'sm'} className='w-full' variant={'destructive'} disabled={isLoading} onClick={()=>{handleDelete(file.id,file.userId)}}>
      {isLoading ?(<>
      <Loader className='w-4 h-4 animate-spin' />
      </>):
      (
        <TrashIcon className='h-4 w-4' />
      )}
    </Button>
    </div>
  </li>
  )
}

export default FileCard