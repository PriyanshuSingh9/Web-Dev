import React from 'react'
import { initialUser } from '@/lib/initial-user'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

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
        return redirect(`/servers/${server.id}`)
    }
    return (
        <div>IdlePage</div>
    )
}
