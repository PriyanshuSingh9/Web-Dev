import React from 'react'
import User from '@/models/User';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from '@/lib/db';
import DashboardForm from '@/components/DashboardForm';

const Dashboard = async () => {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }

    await connectDB()
    const userDoc = await User.findOne({ email: session.user?.email }).lean()

    // Serialize the object to handle ObjectId and Date types
    const user = JSON.parse(JSON.stringify(userDoc))

    return (
        <DashboardForm user={user} />
    )
}

export default Dashboard