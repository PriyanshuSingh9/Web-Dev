import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import GlareHover from './GlareHover'

import { auth, signOut } from '@/auth'

const Navbar = async () => {
    const session = await auth()
    const pfp = session?.user?.image
    return (
        < nav className='bg-gray-900 text-white px-4 h-16 flex justify-between items-center' >
            <Link href="/">
                <div className='logo font-bold text-lg flex justify-center items-center gap-2'>
                    <span><Image src="/tea.gif" height={44} width={44} alt="tea" /></span>
                    <span>
                        Get Me a Chai
                    </span>
                </div>
            </Link>
            {session ?
                <div className='flex items-center gap-4'>
                    <Link href="/dashboard">
                        <GlareHover
                            width="32px"
                            height="32px"
                            glareColor="#ffffff"
                            glareOpacity={0.6}
                            glareAngle={-45}
                            glareSize={150}
                            background="transparent"
                            borderColor="transparent"
                            transitionDuration={600}
                        >
                            <Image src={pfp || "/person.png"} height={40} width={40} alt='Profile' className='rounded-full border-2 border-blue-300'></Image>
                        </GlareHover>
                    </Link>
                    <form action={async () => {
                        "use server";
                        await signOut()
                    }}>
                        {/* <button className='inline-flex p-2 items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#503bef,45%,#8678f9,55%,#503bef)] bg-[length:200%_100%] animate-background-shine px-6 font-bold text-white transition-colors cursor-pointer'>
                            Logout
                        </button> */}
                    </form>
                </div>
                :
                <Link href='/login'>
                    <div>
                        <button className='inline-flex p-2 items-center justify-center rounded-md border border-gray-800 bg-linear-to-r from-[#503bef] from-0% to-[#8678f9] px-6 font-bold text-white transition-colors'>
                            Login
                        </button>
                    </div>
                </Link>
            }
        </nav >
    )
}

export default Navbar