import React from 'react'

const Navbar = () => {
    return (
        < nav className='bg-gray-900 text-white px-3 h-16 flex justify-between items-center' >
            <div className='logo font-bold text-lg'>GetMeaChai!</div>
            <ul className='flex gap-10'>
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Sign Up</li>
                <li>Login</li>
            </ul>
        </nav >
    )
}

export default Navbar