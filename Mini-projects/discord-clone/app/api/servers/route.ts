import { memberRole } from "@/lib/generated/prisma/enums"
import { currentUser } from "@/lib/current-user"
import { db } from "@/lib/db"

import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json()
        const user = await currentUser()

        if (!user) {
            return new NextResponse("unauthorized", { status: 401 })
        }
        const server = await db.server.create({
            data: {
                userId: user.id,
                serverName: name,
                imageUrl: imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        { name: "general", userId: user.id }
                    ]
                },
                members: {
                    create: [
                        { userId: user.id, role: memberRole.ADMIN }
                    ]
                }
            }
        })
        return NextResponse.json(server, { status: 200 })
    } catch (error) {
        console.log("[SERVERS_POST]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
