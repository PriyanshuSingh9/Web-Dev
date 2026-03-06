import { db } from "@/lib/db"
import { currentUser } from "@/lib/current-user"
import { redirect } from "next/navigation"

import { ServerSidebar } from "@/components/server/server-sidebar"

const ServerIdLayout = async (
    { children, params }: { children: React.ReactNode, params: Promise<{ serverId: string }> }) => {
    // params is the current url slugified basically
    const { serverId } = await params
    const user = await currentUser()

    if (!user) return redirect("/sign-in")

    const server = await db.server.findUnique({
        where: {
            id: serverId,
            // not everyone with the server id is a member of the server
            // so we need to check if the current user is a member of the server
            members: {
                some: {
                    userId: user.id
                }
            }
        }
    })

    if (!server) return redirect("/servers")

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                {/* Server Sidebar */}
                <ServerSidebar serverId={serverId} />
            </div>
            <main className="md:pl-60 h-full">
                {children}
            </main>
        </div>
    )
}

export default ServerIdLayout
