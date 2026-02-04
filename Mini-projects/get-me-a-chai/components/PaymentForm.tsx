"use client"
import React from 'react'
import { useForm } from 'react-hook-form'

const PaymentForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = (data: any) => {
        reset()
        console.log(data)
    }

    return (
        <div className='bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-xl backdrop-blur-sm' >
            <h2 className="text-xl font-bold text-white mb-6">Make a Payment</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <div className="flex flex-col gap-1.5">
                    <input
                        type="text"
                        placeholder='Enter username'
                        className='w-full bg-slate-800 rounded-lg border border-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                        {...register("username", { required: true })}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <input
                        type="text"
                        placeholder='Enter message'
                        className='w-full bg-slate-800 rounded-lg border border-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                        {...register("message")}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <input
                        type="number"
                        placeholder='Enter amount'
                        className='w-full bg-slate-800 rounded-lg border border-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                        {...register("amount", { required: true, min: 1 })}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
                >
                    Pay Now
                </button>
            </form>
        </div>
    )
}

export default PaymentForm
