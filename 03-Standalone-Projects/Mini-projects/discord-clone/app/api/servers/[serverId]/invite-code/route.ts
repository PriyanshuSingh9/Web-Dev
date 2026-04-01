import { db } from "@/lib/db"
import { currentUser } from "@/lib/current-user"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ serverId: string }> }) {
    try {
        const { serverId } = await params;
        const user = await currentUser()
        if (!user) {
            return new NextResponse("Unauthorized User", { status: 401 })
        }
        if (!serverId) {
            return new NextResponse("Server ID is missing", { status: 401 })
        }
        const server = await db.server.update({
            where:
            {
                id: serverId,
                userId: user.id
            },
            data: {
                inviteCode: uuidv4()
            }
        })
        return NextResponse.json(server)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}