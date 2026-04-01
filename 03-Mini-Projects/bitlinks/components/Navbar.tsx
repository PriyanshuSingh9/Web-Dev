import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center px-8 py-4 bg-slate-900 text-white sticky top-0 z-50 shadow-md'>
            <div className='text-2xl font-extrabold tracking-tight'>
                <Link href="/" className="hover:text-blue-400 transition-colors">BitLinks</Link>
            </div>
            <div className='flex items-center gap-8'>
                <ul className='flex gap-6 font-medium'>
                    <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                    <li><Link href="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
                    <li><Link href="/shorten" className="hover:text-blue-400 transition-colors">Shorten</Link></li>
                    <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                </ul>
                <button className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95'>
                    Login
                </button>
            </div>
        </nav>
    )
}

export default Navbar
