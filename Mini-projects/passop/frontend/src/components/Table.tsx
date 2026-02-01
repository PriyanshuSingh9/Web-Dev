// import React from 'react'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { fetchEntry, deleteEntry } from "../redux/passwordEntry/passwordEntrySlice"
import type { RootState, AppDispatch } from "../redux/store"

const Table = () => {
    const entries = useSelector((state: RootState) => state.passwordEntry.value)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchEntry())
    }, [dispatch])

    const copyText = (text: string) => {
        navigator.clipboard.writeText(text)
        // Ideally we would show a toast here to inform the user
    }

    const handleDelete = (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this password?");
        if (confirmDelete) {
            dispatch(deleteEntry(id));
        }
    }

    return (
        <div className="max-w-7xl mx-auto my-8 px-4">
            <h2 className='text-black text-xl font-bold mb-4'>Your Passwords</h2>
            {entries.length === 0 ? (
                <div className="text-center text-gray-600">No passwords saved yet.</div>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className='text-xs text-gray-700 uppercase bg-green-200'>
                            <tr>
                                <th scope="col" className="px-6 py-3">Site</th>
                                <th scope="col" className="px-6 py-3">Username</th>
                                <th scope="col" className="px-6 py-3">Password</th>
                                <th scope="col" className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((item) => (
                                <tr key={item._id || item.url} className="bg-white border-b hover:bg-green-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-50 block text-blue-600">{item.url}</a>
                                            <div onClick={() => copyText(item.url)} title="Copy URL" className="p-1 rounded-full hover:bg-green-200 transition-colors cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-green-700"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="truncate max-w-37.5">{item.username}</span>
                                            <div onClick={() => copyText(item.username)} title="Copy Username" className="p-1 rounded-full hover:bg-green-200 transition-colors cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-green-700"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-lg leading-none">{"•".repeat(10)}</span>
                                            <div onClick={() => copyText(item.password)} title="Copy Password" className="p-1 rounded-full hover:bg-green-200 transition-colors cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-green-700"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-4">
                                            <div onClick={() => item._id && handleDelete(item._id)} title="Delete" className="p-1 rounded-full hover:bg-red-100 transition-colors cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-red-600"><path d="M3 6h18" /><path d="M19 6v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6" /><path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Table
