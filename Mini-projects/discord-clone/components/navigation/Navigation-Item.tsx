"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ActionTooltip } from "../Action-Tooltip"

interface NavgationItemProps {
    id: string
    name: string
    imageUrl: string
}
export const NavigationItem = ({
    id,
    name,
    imageUrl
}: NavgationItemProps) => {
    const router = useRouter();
    const params = useParams();
    return (
        <ActionTooltip
            side="right"
            align="center"
            label={name}>
            <button
                className="group relative flex items-center mb-2"
                onClick={() => router.push(`/servers/${id}`)}>
                <div
                    className={cn(
                        "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                        params?.serverId !== id && "group-hover:h-[20px]",
                        params?.serverId === id ? "h-[36px]" : "h-[8px]"
                    )}
                />
                <div
                    className={cn(
                        "relative group flex mx-3 h-[48px] w-[48px] rounded-full group-hover:rounded-[16px] transition-all overflow-hidden",
                        params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                    )}>
                    <Image src={imageUrl} fill alt="server" />
                </div>
            </button>
        </ActionTooltip>
    )
}
