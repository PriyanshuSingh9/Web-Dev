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

const LeaveServerModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const router = useRouter()

    const { server } = data
    const isModalOpen = isOpen && type === "leaveServer"

    const [loading, setLoading] = useState(false)

    const onLeaveServer = async () => {
        try {
            setLoading(true)
            await axios.patch(`/api/servers/${server?.id}/leave`)
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
                        Leave Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to leave this server? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="bg-gray-100 dark:bg-[#2b2d31] px-6 py-4 flex items-center w-full gap-x-4">
                    <Button
                        disabled={loading}
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        variant="primary"
                        onClick={onLeaveServer}
                        className="flex-1"
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default LeaveServerModal
