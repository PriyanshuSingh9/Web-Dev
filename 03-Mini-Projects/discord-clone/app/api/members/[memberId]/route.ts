import { NextResponse } from "next/server"
import { currentUser } from "@/lib/current-user"
import { db } from "@/lib/db"
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ memberId: string }> }
) {
    try {
        const user = await currentUser()
        if (!user) return NextResponse.json("Unauthorized", { status: 401 })

        const { role } = await req.json()
        const memberId = (await params).memberId
        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get("serverId")

        if (!serverId) return NextResponse.json("Server ID missing", { status: 400 })
        const server = await db.server.update({
            where: {
                id: serverId,
                userId: user.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: memberId,
                            // to make sure that the admin is not trying to update their own role using api
                            userId: {
                                not: user.id
                            }
                        },
                        data: {
                            role,
                        },
                    },
                }
            },
            include: {
                members: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        role: "asc",
                    },
                },
            },

        })
        return NextResponse.json(server, { status: 200 })
    } catch (error) {
        console.log("MEMBERS_ID_PATCH", error)
        return NextResponse.json("Update failed", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ memberId: string }> }
) {
    try {
        const user = await currentUser()
        if (!user) return NextResponse.json("Unauthorized", { status: 401 })

        const memberId = (await params).memberId
        if (!memberId) return NextResponse.json("Member ID missing", { status: 400 })

        const { searchParams } = new URL(req.url)

        const serverId = searchParams.get("serverId")
        if (!serverId) return NextResponse.json("Server ID missing", { status: 400 })


        const server = await db.server.update({
            where: {
                id: serverId,
                userId: user.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: memberId,
                        // to make sure that the admin is not trying to delete their own role using api
                        userId: {
                            not: user.id
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        role: "asc",
                    },
                },
            },
        })

        return NextResponse.json(server, { status: 200 })
    } catch (error) {
        console.log("MEMBER_ID_DELETE", error)
        return NextResponse.json("DELETE failed", { status: 500 })
    }
}