import { Server, Member, User } from "@/lib/generated/prisma/client"

export type ServerWithMembersWithUsers = Server & {
    members: (Member & {
        user: User
    })[]
}