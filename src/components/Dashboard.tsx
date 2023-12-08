import React, { Suspense } from 'react'
import UploadButton from './UploadButton'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { Ghost} from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import FileCard from '@/components/FileCard'



const Dashboard = async() => {

  const {getUser} = getKindeServerSession()
  const user = await getUser();

  if(!user){
    redirect('/')
  }



  const userFiles = await db.file.findMany({
        where:{
            userId:user?.id
        }
    })

   


  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className='mb-3 font-bold text-5xl text-gray-900'>My Files</h1>
        <UploadButton />
      </div>

      {/* all Files */}

      <Suspense fallback={<Skeleton height={100} className='my-2' count={3} />}>
      {userFiles && (userFiles.length>0) ? (
        <>
        <ul className='mt-8 grid grid-col-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
          {userFiles.sort((a,b)=>new Date(b.createdAt).getTime()- new Date(a.createdAt).getTime()).map((file)=>(
            <FileCard file={file} key={file.id} /> 
          ))}
        </ul>
        </>
      ):(
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className='w-8 h-8 text-zinc-800' />
          <h3 className='font-semibold text-xl'>Pretty empty around here</h3>
          <p>Lets&apos;s upload your first PDF.</p>
        </div>
      )}
      </Suspense>

      </main>
  )
}

export default Dashboard