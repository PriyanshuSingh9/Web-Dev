import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
interface ServerPageProps {
    params: Promise<{
        serverId: string;
    }>
}
const ServerPage = async ({ params }: ServerPageProps) => {
    const { serverId } = await params;

    const user = await currentUser()
    if (!user) return redirect("/idle")

    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    userId: user.id
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "general"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    if (!server) return redirect("/idle")
    const generalChannel = server.channels[0]
    if (generalChannel.name !== "general") return null


    return redirect(`/servers/${serverId}/channels/${generalChannel.id}`)
}

export default ServerPage
