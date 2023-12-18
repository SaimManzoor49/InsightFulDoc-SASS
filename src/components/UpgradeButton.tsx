'use client'
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import axios from 'axios'

const UpgradeButton = () => {
const handleClick = async()=>{
  await axios.get(`/api/stripe`).then((res)=>{
    const {data} = res;
    window.location.href =data.url ?? "/dashboard/billing"
  })

}

  return (
    <Button className='w-full' onClick={handleClick}>
        Upgrade now <ArrowRight className='h-5 w-5 ml-1.5' />
    </Button>
  )
}

export default UpgradeButton