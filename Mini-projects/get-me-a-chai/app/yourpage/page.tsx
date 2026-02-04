import React from 'react'
import User from '@/models/User';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from '@/lib/db';

import PaymentForm from '@/components/PaymentForm';
import Supporters from '@/components/Supporters';

import Image from 'next/image';
import Payment from '@/models/Payment';

const YourPage = async () => {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    await connectDB()
    const user = await User.findOne({ email: session.user?.email }).lean()

    // Fetch payments sorted by newest first and only completed ones
    const payments = await Payment.find({ to_user: user?.email, done: true })
        .sort({ createdAt: -1 })
        .lean()

    return (
        <div className="w-full min-h-screen bg-black text-white pb-10">
            <div className="relative w-full h-87.5">
                <Image
                    src={user?.coverImage || "/default-cover.png"}
                    alt="Cover Image"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
                    <div className="relative w-32 h-32">
                        <Image
                            src={user?.image || "/default-avatar.png"}
                            alt="Profile Image"
                            fill
                            className="rounded-full border-4 border-black object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>

            <div className="mt-20 text-center mb-10">
                <h1 className="text-3xl font-bold">@{user?.username}</h1>
                <p className="text-gray-400 mt-2">Creating content for you</p>
            </div>

            <div className='flex flex-col md:flex-row gap-6 max-w-6xl mx-auto px-4'>
                <div className='bg-slate-900/50 border border-slate-800 flex-1 p-6 rounded-xl backdrop-blur-sm'>
                    <h2 className='text-xl font-bold mb-4 border-b border-slate-700 pb-2'>Supporters</h2>
                    <Supporters payments={payments} />
                </div>
                <div className='flex-1'>
                    <PaymentForm />
                </div>
            </div >
        </div>
    )
}

export default YourPage

