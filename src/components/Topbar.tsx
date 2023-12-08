'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button } from './ui/button'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

const Topbar = ({ numPages, currPage, setcurrPage,scale, setScale }: { numPages: number, currPage: number, setcurrPage: Dispatch<SetStateAction<number>>, scale:number, setScale:Dispatch<SetStateAction<number>> }) => {

    const validator = z.object({
        page: z.string().refine((num) => Number(num) > 0 && Number(num) <= numPages!)
    })

    type TValidator = z.infer<typeof validator>

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<TValidator>({
        defaultValues: {
            page: "1"
        },
        resolver: zodResolver(validator)
    })

    const handlePageSubmit = ({ page }: TValidator) => {
        setcurrPage(Number(page))
        setValue("page", String(page))
    }
    return (
        <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5">
                <Button aria-label='previous page' variant={'ghost'} disabled={currPage <= 1}
                    onClick={() => {
                        setcurrPage((s) => (
                            s - 1 > 1 ? s - 1 : 1
                        ))
                    }}
                >
                    <ChevronDown className='h-4 w-4' />
                </Button>
                <div className="flex items-center gap-1.5">
                    <Input {...register("page")} // a bug
                     className={cn(
                        "w-12 h-8",
                        errors.page && "focus-visible:ring-red-500"
                    )} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit(handlePageSubmit)()
                        }
                    }} />
                    <p className='text-zinc-700 text-sm space-x-1'>
                        <span>/</span>
                        <span>{numPages ?? "X"}</span>
                    </p>
                </div>
                <Button aria-label='next page' variant={'ghost'}
                    disabled={numPages === undefined || currPage === numPages}
                    onClick={() => {
                        setcurrPage(s => s + 1 > numPages! ? numPages! : s + 1)
                    }}
                >
                    <ChevronUp className='h-4 w-4' />
                </Button>
            </div>
            <div className="space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='gap-1.5' aria-label='zoom' variant={'ghost'} >
                            <Search className='h-4 w-4'/>
                            {scale*100}% <ChevronDown className='h-3 w-3 opacity-50' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={()=>{
                            setScale(1)
                        }}>
                            100%
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={()=>{
                            setScale(1.5)
                        }}>
                            150%
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={()=>{
                            setScale(2)
                        }}>
                            200%
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={()=>{
                            setScale(2.5)
                        }}>
                            250%
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Topbar