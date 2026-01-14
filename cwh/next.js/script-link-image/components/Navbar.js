import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='flex justify-between px-2 py-4 bg-gray-800'>
            <div className="logo font-bold">Facebook</div>
            <ul className='flex gap-6'>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
