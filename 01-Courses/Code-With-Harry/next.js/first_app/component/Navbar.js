import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-100 border-b border-gray-200 text-black">
      <ul className="flex gap-4">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link href="/about" className="hover:underline">About</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
