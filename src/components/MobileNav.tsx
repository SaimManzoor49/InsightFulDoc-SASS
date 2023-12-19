'use client'
// import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight, MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
    const [isOpen, setIsOpne] = useState(false)

    const handleToggle = () => setIsOpne(prev => !prev)

    const pathname = usePathname()

    useEffect(() => {
        if (isOpen) handleToggle()
    }, [pathname])

    const closeOnCurrent = (href: string) => {
        if (pathname === href) {
            handleToggle()
        }
    }

    return (
        <div className='sm:hidden'>
            <MenuIcon className='relative z-50 h-5 w-5 text-zinc-700' onClick={handleToggle} />
            {isOpen ?
                (
                    <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
                        <ul className='absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8'>
                            {!isAuth ?
                                (
                                    <>
                                        <li>
                                            <Link onClick={() => closeOnCurrent('/sign-up')} className='flex items-center w-full font-semibold text-green-600' href={'/sign-up'}>Get Started <ArrowRight className='ml-2 h-5 w-5' /></Link>
                                        </li>
                                        <li className='my-4 h-px w-full text-green-300' />
                                        <li>
                                            <Link onClick={() => closeOnCurrent('/sign-in')} className='flex items-center w-full font-semibold ' href={'/sign-in'}>Sign in</Link>
                                        </li>
                                        <li className='my-4 h-px w-full text-green-300' />
                                        <li>
                                            <Link onClick={() => closeOnCurrent('/pricing')} className='flex items-center w-full font-semibold ' href={'/pricing'}>Pricing</Link>
                                        </li>
                                    </>
                                ) :
                                (<>
                                    <li>
                                        <Link onClick={() => closeOnCurrent('/dashboard')} className='flex items-center w-full font-semibold ' href={'/dashboard'}>Dashboard</Link>
                                    </li>
                                    <li className='my-4 h-px w-full text-green-300' />
                                    <li>
                                        <Link href={'/sign-out'} className='flex items-center w-full font-semibold ' >Sign out</Link>
                                    </li>
                                </>)
                            }
                        </ul>
                    </div>
                )
                :
                null}
        </div>
    )
}

export default MobileNav