import { currentUser } from "@/lib/current-user"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { getOrCreateConversation } from "@/lib/coversation"
import { ChatHeader } from "@/components/chat/chat-header"

interface memberIdPageProps {
    params: Promise<{
        serverId: string
        memberId: string
    }>
}

const MemberIdPage = async (props: memberIdPageProps) => {
    const { serverId, memberId } = await props.params;

    const user = await currentUser()
    if (!user) return redirect("/sign-in")

    const member = await db.member.findFirst({
        where: {
            serverId: serverId,
            userId: user.id
        },
        include: {
            user: true
        }
    })
    if (!member) return redirect("/idle")

    const conversation = await getOrCreateConversation(member.id, memberId)
    if (!conversation) return redirect("/servers/")

    const { memberOne, memberTwo } = conversation
    const otherMember = memberOne.id === member.id ? memberTwo : memberOne
    return (
        <ChatHeader
            name={otherMember.user.name}
            serverId={serverId}
            type={"conversation"}
            imageUrl={otherMember.user.imageUrl}
        />
    )
}

export default MemberIdPage