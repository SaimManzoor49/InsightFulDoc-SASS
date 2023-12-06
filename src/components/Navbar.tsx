import React from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { LoginLink, LogoutLink, RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'

export const Navbar = async () => {

    const { getUser } = getKindeServerSession();
    const user = await getUser()

    return (
        <nav className='sticky h-14  inset-x-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href={'/'} className='flex z-40 font-semibold' >InsightFulDoc.</Link>
                    {/* Add mob nav */}
                    <div className="hidden items-center space-x-4 sm:flex">
                        <>
                            <Link className={buttonVariants({
                                variant: 'ghost',
                                size: 'sm'
                            })} href={'/pricing'}>Pricing</Link>
                            {user
                                ?
                                (<LogoutLink>
                                    <Button>
                                        Logout
                                    </Button>
                                </LogoutLink>)
                                :
                                (
                                    <>
                                        <LoginLink className={buttonVariants({
                                            variant: 'ghost',
                                            size: 'sm'
                                        })} >
                                            Sign in
                                        </LoginLink>
                                        <RegisterLink className={buttonVariants({
                                            size: 'sm'
                                        })} >
                                            Get started
                                            <ArrowRight className='ml-1.5 h-5 w-5' />
                                        </RegisterLink>
                                    </>
                                )}

                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}
