import React from 'react'
import { initialUser } from '@/lib/initial-user'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import InitialModal from '@/components/modals/Initial-Modals'

export default async function IdlePage() {
    const user = await initialUser();

    const server = await db.server.findFirst({
        where: {
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
    if (server) {
        return redirect(`/servers/${server.id}/channels/${server.channels[0].id}`)
    }
    return (
        <div>
            <InitialModal />
        </div>
    )
}
