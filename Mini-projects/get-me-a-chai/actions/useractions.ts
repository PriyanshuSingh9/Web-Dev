"use server"

import connectDB from "@/lib/db"
import User from "@/models/User"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function updateProfile(data: any) {
    await connectDB()
    const session = await auth()
    
    console.log("Data received in updateProfile server action:", data); // Added console.log
    if (!session || !session.user?.email) {
        throw new Error("Unauthorized")
    }

    // Update the user whose email matches the session
    await User.updateOne({ email: session.user.email }, data)
    
    revalidatePath("/dashboard")
}