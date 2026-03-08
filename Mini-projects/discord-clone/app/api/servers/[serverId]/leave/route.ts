import { NextResponse } from "next/server"
import { currentUser } from "@/lib/current-user"
import { db } from "@/lib/db"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ serverId: string }> }
) {
    try {
        const user = await currentUser()
        if (!user) {
            return new NextResponse("Unauthorised", { status: 401 })
        }

        const { serverId } = await params
        if (!serverId) {
            return new NextResponse("Invalid server ID", { status: 400 })
        }
        const server = await db.server.update({
            where: {
                id: serverId,
                // admin cannot leave the server
                userId: {
                    not: user.id
                },
                members: {
                    some: {
                        userId: user.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        userId: user.id
                    }
                }
            }
        })

        return NextResponse.json(server, { status: 200 })
    } catch (error) {
        console.log("[SERVER_ID_LEAVE]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}