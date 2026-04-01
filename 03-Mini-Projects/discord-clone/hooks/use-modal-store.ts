import { Channel, Server } from "@/lib/generated/prisma/client";
import { create } from "zustand";
import { ChannelType } from "@/lib/generated/prisma/enums";

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "editChannel" | "deleteChannel";

interface ModalData {
    server?: Server;
    channelType?: ChannelType;
    channel?: Channel;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void
    onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type: ModalType, data = {}) => set({ type, data, isOpen: true }),
    onClose: () => set({ type: null, isOpen: false })
}))