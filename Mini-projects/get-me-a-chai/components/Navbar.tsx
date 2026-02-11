import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import GlareHover from './GlareHover'

import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'

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
                    <div className="relative group">
                        <button className="flex items-center">
                            <Image
                                src={pfp || "/person.png"}
                                height={40}
                                width={40}
                                alt='Profile'
                                className='rounded-full border-2 border-blue-300'
                            />
                        </button>

                        {/* Dropdown Menu */}
                        <div className="hidden group-hover:block absolute right-0 top-full pt-2 z-50">
                            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-1 w-max min-w-55">
                                <div className='flex items-center gap-3 px-4 py-3 border-b border-gray-700'>
                                    <div className='shrink-0'>
                                        <Image
                                            src={pfp || "/person.png"}
                                            height={32}
                                            width={32}
                                            alt='Profile'
                                            className='rounded-full border border-gray-600'
                                        />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <div className='font-bold text-sm truncate'>@{session.user?.name}</div>
                                        <div className='text-xs text-gray-400 truncate'>{session.user?.email}</div>
                                    </div>
                                </div>
                                <div className="py-1">
                                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                                        Dashboard
                                    </Link>
                                    <Link href={`/${session.user?.name}`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                                        Your Profile
                                    </Link>
                                </div>
                                <div className="border-t border-gray-700 py-1">
                                    <form action={async () => {
                                        "use server";
                                        await signOut({ redirectTo: "/" })
                                    }}>
                                        <button type="submit" className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors">
                                            Logout
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
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