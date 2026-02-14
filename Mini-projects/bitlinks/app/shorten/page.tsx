"use client"
import React from 'react'
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { shortenURL } from "./actions"
import Link from 'next/link'
interface IFormInput {
    originalUrl: string
    shortUrl: string
}

const Shorten = () => {
    const [generated, setGenerated] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IFormInput>()

    // Submit handler is a type that tells ts what data to expect when the form is submitted
    const handleShorten: SubmitHandler<IFormInput> = async (data) => {
        try {
            await shortenURL(data.originalUrl, data.shortUrl)
            setGenerated(`${process.env.NEXT_PUBLIC_HOST || window.location.origin}/${data.shortUrl}`)
        } catch (error) {
            alert(error instanceof Error ? error.message : "An unexpected error occurred")
        }
    }
    return (
        <main className="min-h-[calc(100vh-72px)] bg-slate-50 flex items-center justify-center py-12">
            <div className="container mx-auto px-6 max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
                <h1 className='text-4xl font-black text-slate-900 text-center mb-8'>Shorten URL</h1>
                <form onSubmit={handleSubmit(handleShorten)} className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="originalUrl" className="text-sm font-bold text-slate-700 uppercase tracking-wide"></label>
                        <input
                            type="text"
                            placeholder='Enter your URL'
                            className={`${errors.originalUrl ? "border-red-500" : "border-slate-200"} placeholder-slate-400 bg-slate-50 border  rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900`}
                            {...register("originalUrl", { required: "Enter the url before submitting" })} />
                        {errors.originalUrl && <span className="text-red-500 text-sm mt-1">{errors.originalUrl.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="shortUrl" className="text-sm font-bold text-slate-700 uppercase tracking-wide"></label>
                        <input
                            type="text"
                            placeholder='Enter your preferred short URL text'
                            className={`${errors.shortUrl ? "border-red-500" : "border-slate-200"} placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900`}
                            {...register("shortUrl", { required: "Enter the preffered short url before submitting" })} />
                        {errors.shortUrl && <span className="text-red-500 text-sm mt-1">{errors.shortUrl.message}</span>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] mt-2">
                        {isSubmitting ? 'Shortening...' : 'Shorten'}
                    </button>
                </form>
                <div>
                    {generated && (
                        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                            <p className="font-bold">Short URL Generated:</p>
                            <Link href={generated} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                {generated}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
export default Shorten
