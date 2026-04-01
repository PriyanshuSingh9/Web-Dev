import React from 'react'

export const metadata = {
  title: 'About - Next.js Tutorial',
  description: 'Learn about the problems Next.js solves',
}

const page = () => {
    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-red-400">Problems Solved by Next.js</h1>
            <ul className="list-disc list-inside space-y-2">
                <li className='text-amber-200'>File based routing (no complex config).</li>
                <li className='text-amber-200'>Full stack solution (API routes included).</li>
                <li className='text-amber-200'>Additional features like router from <code>next/navigation</code>.</li>
                <li className='text-amber-200'>Optimized rendering (Server & Client Components).</li>
            </ul>
        </div>
    )
}

export default page
