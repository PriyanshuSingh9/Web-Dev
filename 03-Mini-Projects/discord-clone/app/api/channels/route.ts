import { currentUser } from "@/lib/current-user"
import { db } from "@/lib/db"
import { memberRole } from "@/lib/generated/prisma/enums"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {

        const user = await currentUser()
        if (!user) return new NextResponse("Unauthorized", { status: 401 })

        const { name, type } = await req.json()

        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get("serverId")
        if (!serverId) return new NextResponse("Missing Server ID", { status: 401 })

        if (name === "general") {
            return new NextResponse("Channel name cannot be general", { status: 401 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        userId: user.id,
                        role: {
                            in: [memberRole.ADMIN, memberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        userId: user.id,
                        name,
                        type,
                    }
                }
            }
        })

        return NextResponse.json(server, { status: 200 })
    } catch (error) {
        console.log("[CHANNELS_POST]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}   