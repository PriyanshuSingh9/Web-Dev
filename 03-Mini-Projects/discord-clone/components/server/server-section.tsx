"use client"
import { ChannelType, memberRole } from "@/lib/generated/prisma/enums"
import { ServerWithMembersWithUsers } from "@/types"

import { ActionTooltip } from "@/components/Action-Tooltip"
import { useModal } from "@/hooks/use-modal-store"

import { Plus, Settings } from "lucide-react"

interface ServerSectionProps {
    label: string
    role?: memberRole
    channelType?: ChannelType
    sectionType: "member" | "channel"
    server?: ServerWithMembersWithUsers
}

export const ServerSection = ({
    label,
    role,
    channelType,
    sectionType,
    server
}: ServerSectionProps) => {
    const { onOpen } = useModal()

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role !== memberRole.GUEST && sectionType === "channel" && (
                <ActionTooltip label="Create Channel" side="top">
                    <button
                        onClick={() => onOpen("createChannel", { channelType })}
                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </ActionTooltip>
            )}
            {role === memberRole.ADMIN && sectionType === "member" && (
                <ActionTooltip label="Manage Members" side="top">
                    <button
                        onClick={() => onOpen("members", { server })}
                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                    >
                        <Settings className="h-4 w-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}