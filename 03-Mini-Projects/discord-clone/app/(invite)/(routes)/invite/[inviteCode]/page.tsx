import { db } from "@/lib/db"
import { currentUser } from "@/lib/current-user"
import { redirect } from "next/navigation"

interface InviteCodePageProps {
    params: Promise<{
        inviteCode: string
    }>
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
    const { inviteCode } = await params;
    const user = await currentUser()

    if (!user) {
        return redirect("/idle")
    }
    if (!inviteCode) {
        return redirect("/idle")
    }

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: inviteCode,
            members: {
                some: {
                    userId: user.id
                }
            }
        }
    })

    if (existingServer) {
        return redirect(`/servers/${existingServer.id}`)
    }
    const server = await db.server.update({
        where: {
            inviteCode: inviteCode,
        },
        data: {
            members: {
                create: [
                    {
                        userId: user.id
                    }
                ]
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`)
    }

    return null
}

export default InviteCodePage