import React from 'react'
import User from '@/models/User';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from '@/lib/db';

import PaymentForm from '@/components/PaymentForm';

import Image from 'next/image';

const YourPage = async () => {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    await connectDB()
    const user = await User.findOne({ email: session.user?.email }).lean()

    return (
        <>
            <div className="w-full">
                <div className="relative w-full h-56.5">
                    <Image
                        src={user?.coverImage || "/default-cover.png"}
                        alt="Cover Image"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className='flex justify-center'>
                    <Image src={user?.image || "/default-cover.png"}
                        alt="Image"
                        width={100}
                        height={100}
                        className="relative rounded-full bottom-10 border-3 border-black"
                        priority></Image>
                </div>
            </div>
            <div className='flex gap-2 my-4 mx-auto justify-center items-center text-white'>
                <div className='bg-blue-950 w-150 text-left p-3 rounded'>
                    <h2 className='text-2xl font-bold'> Top Supporters</h2>
                </div>
                <div className='bg-blue-950 w-150 text-left p-3 rounded'>
                    <h2 className='text-2xl font-bold'>Make a Payment</h2>
                    <PaymentForm />
                </div>
            </div >
        </>
    )
}

export default YourPage

