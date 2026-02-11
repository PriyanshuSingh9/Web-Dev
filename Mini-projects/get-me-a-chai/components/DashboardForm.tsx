"use client"
import { useForm } from 'react-hook-form';
import { updateProfile } from '@/actions/useractions';
import { useState } from 'react';
import { userType } from '@/types/types';

const DashboardForm = ({ user }: { user: userType }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: user ? {
            name: user.name || "",
            email: user.email || "",
            username: user.username || "",
            image: user.image || "",
            coverImage: user.coverImage || "",
            cashfreeClientId: user.cashfreeClientId || "",
            cashfreeClientSecret: user.cashfreeClientSecret || "",
        } : {}
    })

    const formSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            await updateProfile(data);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update profile.");
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-10 text-white">Dashboard</h1>
            <form onSubmit={handleSubmit(formSubmit)}
                className='max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-white'>

                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-400 ml-1">Name</label>
                    <input
                        className="w-full bg-slate-800/50 rounded-lg border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        type="text"
                        {...register("name", { required: true })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-400 ml-1">Email</label>
                    <input
                        className="w-full bg-slate-800/50 rounded-lg border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        type="email"
                        {...register("email", { required: true })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-sm font-semibold text-gray-400 ml-1">Username</label>
                    <input
                        className="w-full bg-slate-800/50 rounded-lg border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        type="text"
                        {...register("username", { required: true })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="image" className="text-sm font-semibold text-gray-400 ml-1">Profile Image URL</label>
                    <input
                        className="w-full bg-slate-800/50 rounded-lg border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        type="text"
                        {...register("image")}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="coverImage" className="text-sm font-semibold text-gray-400 ml-1">Cover Image URL</label>
                    <input
                        className="w-full bg-slate-800/50 rounded-lg border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        type="text"
                        {...register("coverImage")}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="cashfreeClientId" className="text-sm font-semibold text-gray-400 ml-1">Cashfree Client ID</label>
                    <input
                        className="w-full bg-slate-800/50 rounded-lg border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        type="text"
                        {...register("cashfreeClientId")}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="cashfreeClientSecret" className="text-sm font-semibold text-gray-400 ml-1">Cashfree Client Secret</label>
                    <input
                        className="w-full bg-slate-800/50 rounded-lg border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        type="password"
                        {...register("cashfreeClientSecret")}
                    />
                </div>

                <div className="md:col-span-2 flex justify-center pt-8">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-1/2 px-10 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-lg"
                    >
                        {isSubmitting ? "Saving Changes..." : "Save Profile Settings"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DashboardForm
