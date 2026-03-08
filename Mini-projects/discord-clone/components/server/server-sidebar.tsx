import { db } from "@/lib/db";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { ChannelType, memberRole } from "@/lib/generated/prisma/enums";

import { ServerHeader } from "@/components/server/server-header";
import { ServerSearch } from "@/components/server/server-search";
import { ServerSection } from "@/components/server/server-section";
import { ServerChannel } from "@/components/server/server-channel";
import { ServerMember } from "@/components/server/server-member";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
interface ServerSidebarProps {
    serverId: string;
}

const channelIconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
}
const roleIconMap = {
    [memberRole.GUEST]: null,
    [memberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />,
    [memberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
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
        <div className="flex flex-col h-full w-full z-5 text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader
                server={server}
                role={role}
            />
            <ScrollArea className="flex-1 px-3">
                <div className="mb-2">
                    <ServerSearch
                        data={[
                            {
                                label: "Text Channels",
                                type: "channel",
                                data: textChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: channelIconMap[channel.type]
                                }))
                            },
                            {
                                label: "Audio Channels",
                                type: "channel",
                                data: audioChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: channelIconMap[channel.type]
                                }))
                            },
                            {
                                label: "Video Channels",
                                type: "channel",
                                data: videoChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: channelIconMap[channel.type]
                                }))
                            },
                            {
                                label: "Members",
                                type: "member",
                                data: members?.map((member) => ({
                                    id: member.id,
                                    name: member.user.name,
                                    icon: roleIconMap[member.role]
                                }))
                            }
                        ]}
                    />
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channel"
                            channelType={ChannelType.TEXT}
                            role={role}
                            label="Text Channels"
                            server={server}
                        />
                        {textChannels.map((channel) => (
                            <ServerChannel
                                key={channel.id}
                                channel={channel}
                                role={role}
                                server={server}
                            />
                        ))}
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channel"
                            channelType={ChannelType.AUDIO}
                            role={role}
                            label="Voice Channels"
                            server={server}
                        />
                        {audioChannels.map((channel) => (
                            <ServerChannel
                                key={channel.id}
                                channel={channel}
                                role={role}
                                server={server}
                            />
                        ))}
                    </div>
                )}
                {!!videoChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channel"
                            channelType={ChannelType.VIDEO}
                            role={role}
                            label="Video Channels"
                            server={server}
                        />
                        {videoChannels.map((channel) => (
                            <ServerChannel
                                key={channel.id}
                                channel={channel}
                                role={role}
                                server={server}
                            />
                        ))}
                    </div>
                )}
                {!!members?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="member"
                            role={role}
                            label="Members"
                            server={server}
                        />
                        {members.map((member) => (
                            <ServerMember
                                key={member.id}
                                member={member}
                                server={server}
                            />
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}