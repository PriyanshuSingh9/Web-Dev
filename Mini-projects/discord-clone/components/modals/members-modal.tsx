"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import axios from "axios"
import qs from "query-string"
import { db } from "@/lib/db"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import type { ServerWithMembersWithUsers } from "@/types"
import { memberRole } from "@/lib/generated/prisma/enums"

import { useModal } from "@/hooks/use-modal-store"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserAvatar } from "@/components/user-avatar"
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react"

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
}

const MembersModal = () => {
    const router = useRouter()

    const { onOpen, isOpen, onClose, type, data } = useModal()
    const { server } = data as { server: ServerWithMembersWithUsers }

    const isModalOpen = isOpen && type === "members"

    const [loadingId, setLoadingId] = useState("")
    useEffect(() => {
        setLoadingId("")
    }, [])

    const onRoleChange = async (memberId: string, role: memberRole) => {
        try {
            setLoadingId(memberId)
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server.id,
                }
            })
            const response = await axios.patch(url, { role })
            onOpen("members", { server: response.data })
            router.refresh()
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingId("")
        }
    }

    const onKick = async (memberId: string) => {
        try {
            setLoadingId(memberId)
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server.id,
                }
            })
            const response = await axios.delete(url)
            onOpen("members", { server: response.data })
            router.refresh()
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingId("")
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-[#313338] text-black dark:text-white overflow-hidden max-w-md rounded-lg shadow-lg py-4">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-2xl text-center font-bold dark:text-white">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member) => (
                        <div
                            key={member.id}
                            className="flex items-center gap-x-2 mb-6"
                        >
                            <UserAvatar src={member.user.imageUrl} role={member.role} />
                            <div className="flex flex-col">
                                <div className="text-xs font-semibold flex items-center gap-x-1">
                                    {member.user.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-zinc-500">{member.user.email}</p>
                            </div>
                            {server.userId !== member.userId && (
                                <div className="ml-auto">
                                    {loadingId === member.id && (
                                        <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                                    )}
                                    {loadingId !== member.id && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="h-4 w-4 text-zinc-500" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side="left">
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger className="flex items-center">
                                                        <ShieldQuestion className="w-4 h-4 mr-2" />
                                                        <span>Role</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem
                                                                onClick={() => onRoleChange(member.id, "GUEST")}>
                                                                <Shield className="h-4 w-4 mr-2" />
                                                                Guest
                                                                {member.role === "GUEST" && (
                                                                    <Check className="h-4 w-4 ml-auto" />
                                                                )}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                                                <ShieldCheck className="h-4 w-4 mr-2" />
                                                                Moderator
                                                                {member.role === "MODERATOR" && (
                                                                    <Check className="h-4 w-4 ml-auto" />
                                                                )}
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => onKick(member.id)}
                                                >
                                                    <Gavel className="h-4 w-4 mr-2" />
                                                    Kick
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog >
    )
}

export default MembersModal