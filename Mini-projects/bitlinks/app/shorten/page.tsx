"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

interface IFormInput {
    url: String
    shortURLText: String
}

const Shorten = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IFormInput>()

    // Submit handler is a type that tells ts what data to expect when the form is submitted
    const handleShorten: SubmitHandler<IFormInput> = (data) => {
    }
    return (
        <main className="min-h-[calc(100vh-72px)] bg-slate-50 flex items-center justify-center py-12">
            <div className="container mx-auto px-6 max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
                <h1 className='text-4xl font-black text-slate-900 text-center mb-8'>Shorten URL</h1>
                <form onSubmit={handleSubmit(handleShorten)} className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="url" className="text-sm font-bold text-slate-700 uppercase tracking-wide"></label>
                        <input
                            type="text"
                            placeholder='Enter your URL'
                            className={`${errors.url ? "border-red-500" : "border-slate-200"} placeholder-slate-400 bg-slate-50 border  rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900`}
                            {...register("url", { required: "Enter the url before submitting" })} />
                        {errors.url && <span className="text-red-500 text-sm mt-1">{errors.url.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="shortURLText" className="text-sm font-bold text-slate-700 uppercase tracking-wide"></label>
                        <input
                            type="text"
                            placeholder='Enter your preferred short URL text'
                            className={`${errors.shortURLText ? "border-red-500" : "border-slate-200"} placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900`}
                            {...register("shortURLText", { required: "Enter the preffered short url before submitting" })} />
                        {errors.shortURLText && <span className="text-red-500 text-sm mt-1">{errors.shortURLText.message}</span>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] mt-2">
                        {isSubmitting ? 'Shortening...' : 'Shorten'}
                    </button>
                </form>
            </div>
        </main>
    )
}
export default Shorten
