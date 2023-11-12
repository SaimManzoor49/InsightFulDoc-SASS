import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { trpc } from '../_trpc/client';

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const origin = searchParams.get('origin')

    const {data} = trpc.authCallback.useQuery(undefined,{
      onSuccess:({success})=>{
        // user is synced to DB
        router.push(origin?`/${origin}`:'/dashboard')
      }
    })
  return (
    <div>page</div>
  )
}

export default Page