import React from 'react'
import Image from 'next/image'
import Link from "next/link";
import { ModeToggle } from "@/components/ui/toggle-theme";

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center bg-transparent max-w-7xl mx-auto w-full px-6 py-4 '>
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
            </div>
        </nav>
    )
}

export default Navbar
