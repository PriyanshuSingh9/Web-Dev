"use client"

import CreateServerModal from "@/components/modals/create-server-modal"
import InviteModal from "@/components/modals/invite-modal"
import EditServerModal from "@/components/modals/edit-server-modal"
import MembersModal from "@/components/modals/members-modal"
import CreateChannelModal from "@/components/modals/create-channel-modal"
import DeleteServerModal from "@/components/modals/delete-server-modal"
import { useEffect, useState } from "react"

export const ModalProvider = () => {
    // this prevents the modal from being rendered on the server side causing inconsistency and hydration
    // issues
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])


    if (!mounted) {
        return null
    }
    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
            <CreateChannelModal />
            <DeleteServerModal />
        </>
    )
}
