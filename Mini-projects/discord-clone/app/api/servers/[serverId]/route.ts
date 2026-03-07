import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { currentUser } from "@/lib/current-user"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ serverId: string }> }
) {
    try {
        const user = await currentUser()
        if (!user) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        const { serverName, imageUrl } = await req.json()
        const { serverId } = await params
        const server = await db.server.update({
            where: {
                id: serverId,
                userId: user.id
            },
            data: {
                serverName,
                imageUrl
            }
        })

        return NextResponse.json(server, { status: 200 })
    } catch (error) {
        console.log("[SERVER_ID_PATCH]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}