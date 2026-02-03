import React from 'react'

import User from '@/models/User';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import mongoose from 'mongoose';

import connectDB from '@/lib/db';

const Dashboard = async () => {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }

    await connectDB()
    const user = await User.findOne({ email: session.user?.email })

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.name}</p>
        </div>
    )
}

export default Dashboard