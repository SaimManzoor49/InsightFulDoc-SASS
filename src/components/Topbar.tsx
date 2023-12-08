'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button } from './ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Input } from './ui/input'

const Topbar = ({ numPages, currPage,setcurrPage }: { numPages: number, currPage:number,setcurrPage: Dispatch<SetStateAction<number>> }) => {
    return (
        <>
            <Button aria-label='previous page' variant={'ghost'} disabled={currPage<=1}
                onClick={() => {
                    setcurrPage((s) => (
                        s - 1 > 1 ? s - 1 : 1
                    ))
                }}
            >
                <ChevronDown className='h-4 w-4' />
            </Button>
            <div className="flex items-center gap-1.5">
                <Input className='w-12 h-8' />
                <p className='text-zinc-700 text-sm space-x-1'>
                    <span>/</span>
                    <span>{numPages ?? "X"}</span>
                </p>
            </div>
            <Button aria-label='next page' variant={'ghost'}>
                <ChevronUp className='h-4 w-4' />
            </Button>
        </>
    )
}

export default Topbar