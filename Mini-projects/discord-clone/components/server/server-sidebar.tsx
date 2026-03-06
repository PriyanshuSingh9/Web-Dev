import { db } from "@/lib/db";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { ChannelType } from "@/lib/generated/prisma/enums";

interface ServerSidebarProps {
    serverId: string;
}

export const ServerSidebar = async (
    { serverId }: ServerSidebarProps
) => {
    const user = await currentUser()
    if (!user) {
        redirect("/sign-in")
    }
    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    user: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    })

    if (!server) return redirect("/servers")

    const textChannels = server.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server.channels.filter((channel) => channel.type === ChannelType.VIDEO)

    const members = server.members.filter((member) => member.userId !== user.id)

    const role = server.members.find((member) => member.userId === user.id)?.role
    return (
        <div className="flex flex-col h-full w-full text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]">
            <h1>Server Sidebar</h1>
        </div>
    )
}