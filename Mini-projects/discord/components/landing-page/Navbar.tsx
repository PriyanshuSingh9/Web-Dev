import React from 'react'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs'
import Link from "next/link";
import { ModeToggle } from '@/components/ui/theme-toggle';

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center bg-transparent max-w-7xl mx-auto w-full px-6 py-4'>
            {/* logo */}
            <div className='flex items-center gap-2 cursor-pointer'>
                <Image src="/logo.svg" alt='logo' height={36} width={36}></Image>
                <Link href="/">
                    <span className='text-2xl sm:text-3xl text-foreground font-extrabold tracking-tight'>Discord</span>
                </Link>
            </div>

            {/* sign in / sign up */}
            <div className='flex items-center gap-3 md:gap-4'>
                <ModeToggle />
                <SignedOut>
                    <SignInButton>
                        <button className="text-foreground hover:underline rounded-full font-medium text-sm sm:text-base px-2 sm:px-4 cursor-pointer transition-all hidden md:block">
                            Log In
                        </button>
                    </SignInButton>
                    <SignUpButton>
                        <button className="bg-primary text-primary-foreground hover:shadow-lg rounded-full font-medium text-sm sm:text-base h-10 px-4 sm:px-6 cursor-pointer transition-all duration-200">
                            Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>

                {/* Show the user button when the user is signed in */}
                <SignedIn>
                    <div className="h-10 w-10 flex items-center justify-center">
                        <div className="flex items-center justify-center p-0.5 rounded-full border-2 border-slate-400 hover:border-indigo-500 transition-all duration-300">
                            <UserButton appearance={{ elements: { userButtonAvatarBox: "h-10 w-10" } }} />
                        </div>
                    </div>
                </SignedIn>
            </div>
        </nav>
    )
}

export default Navbar
