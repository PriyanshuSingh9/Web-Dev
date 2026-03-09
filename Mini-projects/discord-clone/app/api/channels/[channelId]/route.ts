export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ channelId: string }> }
) {
    try {
        const { channelId } = await params;
        const { currentUser } = await import("@/lib/current-user")
        const { db } = await import("@/lib/db")
        const { memberRole } = await import("@/lib/generated/prisma/enums")
        const { NextResponse } = await import("next/server")
        const user = await currentUser()
        if (!user) return new NextResponse("Unauthorized", { status: 401 })

        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get("serverId")
        if (!serverId) return new NextResponse("Missing Server ID", { status: 401 })
        if (!channelId) return new NextResponse("Missing Channel ID", { status: 401 })

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
                    delete: {
                        id: channelId,
                        name: {
                            not: "general"
                        }
                    }
                }
            }
        })

        return NextResponse.json(server, { status: 200 })
    } catch (error) {
        console.log("[CHANNEL_ID_DELETE]", error)
        const { NextResponse } = await import("next/server")
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ channelId: string }> }
) {
    try {
        const { channelId } = await params;
        const { currentUser } = await import("@/lib/current-user")
        const { db } = await import("@/lib/db")
        const { memberRole } = await import("@/lib/generated/prisma/enums")
        const { NextResponse } = await import("next/server")
        const user = await currentUser()
        if (!user) return new NextResponse("Unauthorized", { status: 401 })

        const { name, type } = await req.json()
        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get("serverId")

        if (!serverId) return new NextResponse("Missing Server ID", { status: 401 })
        if (!channelId) return new NextResponse("Missing Channel ID", { status: 401 })

        if (name === "general") {
            return new NextResponse("Channel name cannot be 'general'", { status: 400 })
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
                    update: {
                        where: {
                            id: channelId,
                            NOT: {
                                name: "general"
                            }
                        },
                        data: {
                            name,
                            type
                        }
                    }
                }
            }
        })

        return NextResponse.json(server, { status: 200 })
    } catch (error) {
        console.log("[CHANNEL_ID_PATCH]", error)
        const { NextResponse } = await import("next/server")
        return new NextResponse("Internal error", { status: 500 })
    }
}
