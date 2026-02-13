"use client";
import React from 'react'

const Contact = () => {
    return (
        <main className="bg-slate-50 min-h-screen py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Contact Info Sidebar */}
                    <div className="bg-slate-900 text-white p-12 md:w-2/5 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-6">Get in touch</h1>
                            <p className="text-slate-400 mb-8">
                                Have a question about our features or security? We're here to help you 24/7.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-600/20 p-3 rounded-lg text-blue-400">
                                        📧
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Email</h4>
                                        <p className="text-sm text-slate-400">support@bitlinks.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-600/20 p-3 rounded-lg text-blue-400">
                                        📍
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Office</h4>
                                        <p className="text-sm text-slate-400">123 Link Street, Silicon Valley, CA</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h4 className="font-bold mb-4">Follow us</h4>
                            <div className="flex gap-4">
                                <span className="hover:text-blue-400 cursor-pointer transition-colors">Twitter</span>
                                <span className="hover:text-blue-400 cursor-pointer transition-colors">LinkedIn</span>
                                <span className="hover:text-blue-400 cursor-pointer transition-colors">GitHub</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-12 md:w-3/5">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="name"
                                        placeholder="John Doe"
                                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        placeholder="john@example.com"
                                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="subject" className="text-sm font-bold text-slate-700 uppercase tracking-wide">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject"
                                    placeholder="How can we help?"
                                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm font-bold text-slate-700 uppercase tracking-wide">Message</label>
                                <textarea 
                                    id="message" 
                                    rows={5}
                                    placeholder="Tell us more about your inquiry..."
                                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                                ></textarea>
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Contact
