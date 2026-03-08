"use client"

import { useState } from "react"
import axios from "axios"
import { useModal } from "@/hooks/use-modal-store"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const DeleteServerModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal()
    const router = useRouter()

    const { server } = data
    const isModalOpen = isOpen && type === "deleteServer"

    const onDeleteServer = async () => {
        try {
            await axios.delete(`/api/servers/${server?.id}`)
            onClose()
            router.refresh()
            router.push(`/idle`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-[#313338] text-black dark:text-white overflow-hidden max-w-md rounded-lg shadow-lg py-4">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-2xl text-center font-bold dark:text-white">
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to delete this server? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="px-6 pb-8">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="w-full h-12 text-zinc-500 dark:text-zinc-400"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onDeleteServer}
                        className="w-full h-12"
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default DeleteServerModal
