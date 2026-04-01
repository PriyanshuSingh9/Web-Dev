import { db } from "@/lib/db"
import { currentUser } from "@/lib/current-user"
import { redirect } from "next/navigation"
import { ChatHeader } from "@/components/chat/chat-header"

interface ChannelPageProps {
    params: Promise<{
        serverId: string
        channelId: string
    }>
}

const ChannelPage = async (props: ChannelPageProps) => {
    const params = await props.params;
    const user = await currentUser()
    if (!user) return redirect("/sign-in")
    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        }
    })
    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            userId: user.id
        }
    })
    if (!channel || !member) return redirect("/idle ")
    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type={"channel"}
            />
        </div>
    )
}

export default ChannelPage