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
        }
    })
    if (server) {
        return redirect(`/server/${server.id}`)
    }
    return (
        <div>
            <InitialModal />
        </div>
    )
}
