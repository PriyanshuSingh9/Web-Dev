import React from 'react'
import Image from 'next/image'

import { signIn } from '@/auth'
import { redirect } from 'next/navigation'

const Login = () => {
    return (
        <div className='flex flex-col justify-center items-center text-white py-20 p-10 gap-10'>
            <div className='text-center space-y-2'>
                <h2 className='text-white font-bold text-3xl'>
                    Login to get started
                </h2>
            </div>

            <div className='flex flex-col gap-4 w-full max-w-sm justify-center items-center'>

                <form action={async () => {
                    "use server"
                    await signIn("github", { redirectTo: "/dashboard" })
                }}>
                    <button type="submit" className='inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-slate-900 hover:bg-slate-800 px-6 font-bold text-white transition-colors gap-2'>
                        <Image width={24} height={24} src="/GitHub_Invertocat_Black_Clearspace.png" alt='GitHub' className='invert' />
                        Continue with GitHub
                    </button>
                </form>

                <form action={async () => {
                    "use server"
                    await signIn("google", { redirectTo: "/dashboard" })
                }}>
                    <button type="submit" className='inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-slate-900 hover:bg-slate-800 px-6 font-bold text-white transition-colors gap-2'>
                        <Image width={20} height={20} src="/Google__G__logo.svg" alt='Google' />
                        Continue with Google
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login