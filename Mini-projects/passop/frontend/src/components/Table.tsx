// import React from 'react'
import type { passwordEntry } from "../types"

// passwords is a separate object thus we wrap it in {} to destructure it as an array of type passwordEntry
const Table = ({ passwords }: { passwords: passwordEntry[] }) => {
    return (
        <div className="max-w-7xl mx-auto my-2">
            <div className="mt-8">
                <h2 className='text-black text-xl font-bold'>Your Passwords</h2>
            </div>
            <ul className='flex text-white bg-green-800 min-w-fit m-auto '>
                <li className="min-w-4/12 p-1 flex justify-center">Site</li>
                <li className="min-w-3/12 p-1 flex justify-center">Username</li>
                <li className="min-w-3/12 p-1 flex justify-center">Password</li>
                <li className="min-w-2/12 p-1 flex justify-center">Actions</li>
            </ul>
            <div>
                {passwords.map((data) => (
                    <div>{data.url}</div>
                ))}
            </div>
        </div>
    )
}

export default Table