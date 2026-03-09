"use client"

import { useState } from "react"
import axios from "axios"
import qs from "query-string"
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

const DeleteChannelModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const router = useRouter()

    const { server, channel } = data
    const isModalOpen = isOpen && type === "deleteChannel"
    const [isLoading, setIsLoading] = useState(false)

    const onDeleteChannel = async () => {
        try {
            setIsLoading(true)
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: { serverId: server?.id }
            })
            await axios.delete(url)
            onClose()
            router.refresh()
            window.location.assign(`/servers/${server?.id}`)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-[#313338] text-black dark:text-white overflow-hidden max-w-md rounded-lg shadow-lg py-4">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-2xl text-center font-bold dark:text-white">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        <span className="font-semibold text-indigo-500">#{channel?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="bg-gray-100 dark:bg-[#2b2d31] px-6 py-4 flex items-center w-full gap-x-4">
                    <Button
                        disabled={isLoading}
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        variant="primary"
                        onClick={onDeleteChannel}
                        className="flex-1"
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default DeleteChannelModal
