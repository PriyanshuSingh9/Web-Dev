"use client"

import { memberRole } from "@/lib/generated/prisma/enums";
import { Server, Member, User } from "@/lib/generated/prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

interface ServerMemberProps {
    member: Member & { user: User };
    server: Server;
}

const roleIconMap = {
    [memberRole.GUEST]: null,
    [memberRole.MODERATOR]: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />,
    [memberRole.ADMIN]: <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />
}

export const ServerMember = ({
    member,
    server
}: ServerMemberProps) => {
    const params = useParams();
    const router = useRouter();

    const icon = roleIconMap[member.role];

    const onClick = () => {
        router.push(`/servers/${params?.serverId}/conversations/members/${member.id}`)
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
                params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700/50"
            )}
        >
            <UserAvatar src={member.user.imageUrl} className="h-8 w-8 md:h-8 md:w-8" />
            <p className={cn(
                "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>
                {member.user.name}
            </p>
            {icon}
        </button>
    )
}