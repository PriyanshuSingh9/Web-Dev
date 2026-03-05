import React from 'react'

import { UploadDropzone } from "@/lib/uploadThing"
import "@uploadthing/react/styles.css"

import { X } from "lucide-react"
import Image from "next/image"

interface fileUploadProps {
    endpoint: "messageFile" | "serverImage",
    value: string,
    onChange: (url?: string) => void,
    className?: string
}

const FileUpload = ({
    endpoint,
    value,
    onChange
}: fileUploadProps) => {
    const fileType = value?.split(".").pop()
    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
                <button
                    className="absolute bg-indigo-500 text-white p-1 rounded-full top-0 right-0 shadow-sm"
                    onClick={() => {
                        onChange("")
                    }}
                    type="button"
                >
                    <X className="w-4 h-4" />
                </button>
            </div >
        )
    }
    else {
        return (
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    // res is an array of ClientUploadedFileData objects; pick the first
                    // and pass its URL (use ufsUrl or url depending on preference)
                    const url = res?.[0]?.ufsUrl
                    onChange(url)
                }}
                onUploadError={(error: Error) => {
                    console.log(error)
                }}
            />
        )
    }
}

export default FileUpload
