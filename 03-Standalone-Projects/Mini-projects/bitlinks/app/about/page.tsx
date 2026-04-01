import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const About = () => {
    return (
        <main className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-6">Our Mission</h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        We believe that the internet should be accessible, transparent, and free from unnecessary tracking. BitLinks was born out of a desire to provide a simple, powerful tool for everyone.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-100">
                        <div className="absolute inset-0 bg-blue-600/10 z-10"></div>
                        <Image
                            src="/vector.jpg"
                            alt="About BitLinks"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-bold text-slate-900">Why we built BitLinks</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Most URL shorteners today come with a catch. They either hide your data behind expensive paywalls, track your users across the web, or force you through cluttered dashboards just to shorten a single link.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            At BitLinks, we stripped away the noise. We built a tool that focus on speed, privacy, and simplicity. Whether you're a developer, a small business owner, or just someone sharing a link with friends, we've got you covered.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                <h3 className="font-bold text-blue-600 text-xl mb-1">100%</h3>
                                <p className="text-sm text-slate-500">Transparent Tracking</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                <h3 className="font-bold text-blue-600 text-xl mb-1">Fast</h3>
                                <p className="text-sm text-slate-500">Global Redirection</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 py-16 text-center text-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6">Ready to simplify your links?</h2>
                    <Link
                        href="/shorten"
                        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-lg active:scale-95"
                    >
                        Get Started Now
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default About
