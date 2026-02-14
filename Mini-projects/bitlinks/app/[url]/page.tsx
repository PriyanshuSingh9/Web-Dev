import React from 'react'
import { notFound, redirect } from 'next/navigation'
import getOriginalURL from './actions'

interface PageProps {
    params: Promise<{ url: string }>
}


const page = async ({ params }: PageProps) => {
    const { url: slug } = await params
    const originalUrl = await getOriginalURL(slug)

    console.log("Original URL:", originalUrl);
    if (originalUrl) {
        console.log("Redirecting to:", originalUrl);
        redirect(originalUrl as string)
    }
    else {
        notFound()
    }
}

export default page
