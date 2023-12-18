'use client'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns'
interface IBillingFromProps{
    subscriptionPlan:Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}
const BillingForm = ({subscriptionPlan}:IBillingFromProps) => {
const [isLoading,setIsLoading] = useState(false)

    const handleClick = async()=>{
        setIsLoading(true)
        await axios.get(`/api/stripe`).then((res)=>{
            const {data} = res;
            if(!data.url||data.url===''){
                toast.error("Something went wrong")
            }
            window.location.href = data.url ?? "/dashboard/billing"
            setIsLoading(false)
        }).finally(()=>{
            setIsLoading(false)
        })
        
        setIsLoading(false)
      
      }


  return (
    <MaxWidthWrapper className='max-w-5xl'>
        <form className='mt-12' onSubmit={(e)=>{
            e.preventDefault()
            handleClick()
        }}>
            <Card>
                <CardHeader>
                    <CardTitle>Subscription Plan</CardTitle>
                    <CardDescription>You are currently on the <strong>{subscriptionPlan.name}</strong> plan.</CardDescription>
                </CardHeader>
                <CardFooter className='flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0'>
                    <Button type='submit' disabled={isLoading}>
                        {
                       isLoading?(<Loader2 className='mr-4 h-4 w-4 animate-spin' />):
                        null
                        }
                        {subscriptionPlan.isSubscribed?"Manage Subscription":"Upgrade to pro"}
                    </Button>
                    {subscriptionPlan.isSubscribed?(
                        <p className='rounded-full text-xs font-medium'>
                            {
                                subscriptionPlan.isCanceled?"Your plan will be canceled on " : "Your plan will renew on "
                            }
                            {format(subscriptionPlan.stripeCurrentPeriodEnd!,"dd.MM.yyyy")}
                        </p>
                    ):null}
                </CardFooter>
            </Card>
        </form>
    </MaxWidthWrapper>
  )
}

export default BillingForm