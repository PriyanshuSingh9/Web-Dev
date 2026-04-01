import React from 'react'
import Image from 'next/image'

const Slide1 = () => {
    return (
        <div className='bg-[#d2e823] w-full h-screen flex justify-center items-center p-[5vw]'>
            <div className=''>
                <h1 className='text-[#264f1a] font-extrabold text-8xl'>
                    A link in bio <br /> built for you.
                </h1>
                <p className='text-slate-900'>
                    Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
                </p>
                <div>
                    <input type="text" />
                    <button className='bg-[#264f1a] rounded-full text-white px-10 py-5'>Get started for free</button>
                </div>
            </div>
            <div>
                {/* <Image src="/vercel.svg" height={300} width={300} alt="slide-ones"></Image> */}
                <image width="800px" height="800px" preserveAspectRatio="xMidYMid slice" href="data:image/webp;base64,UklG…xnTu0LrjldS87qKL/yAecV3DAgAA"></image>
            </div>
        </div>
    )
}

export default Slide1