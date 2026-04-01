"use client"
import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Check, Copy, RefreshCw } from "lucide-react";


import { useModal } from "@/hooks/use-modal-store"
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";

const InviteModal = () => {

    const { onOpen, isOpen, onClose, type, data } = useModal()
    const { server } = data

    const isModalOpen = isOpen && type === "invite"

    const origin = useOrigin()
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1000);
    }

    const onNew = async () => {
        try {
            setLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

            onOpen("invite", { server: response.data })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-[#313338] text-black dark:text-white p-0 overflow-hidden max-w-md rounded-lg shadow-lg py-4">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-2xl text-center font-bold dark:text-white">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300">
                        Server Invite Link
                    </Label>
                    <div className="flex items-center gap-x-2 mt-2">
                        <Input
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black dark:bg-zinc-600 dark:text-zinc-200 focus-visible:ring-offset-0"
                            value={inviteUrl}
                            readOnly
                            disabled={loading}
                        />
                        <Button size="icon"
                            onClick={onCopy}
                            disabled={loading}
                        >
                            {copied ?
                                <Check className="w-4 h-4" />
                                :
                                <Copy className="w-4 h-4" />
                            }
                        </Button>
                    </div>
                    <Button
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 dark:text-zinc-400 mt-4"
                        onClick={onNew}
                        disabled={loading}
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default InviteModal