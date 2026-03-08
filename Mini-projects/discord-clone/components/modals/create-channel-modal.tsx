"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import qs from "query-string"

import { useParams, useRouter } from "next/navigation"

import { ChannelType } from "@/lib/generated/prisma/enums"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal-store"

const CreateChannelModal = () => {
    const router = useRouter()

    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === "createChannel"
    const handleClose = () => {
        form.reset()
        onClose()
    }
    const params = useParams()

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Channel name is required"
        }).refine(
            // only one general channel should be there
            name => name !== "general", {
            message: "Channel name cannot be 'general'"
        }
        ),
        type: z.enum(ChannelType)
    })
    type FormData = z.infer<typeof formSchema>

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: ChannelType.TEXT
        }
    })

    const isLoading = form.formState.isSubmitting



    const onSubmit = async (data: FormData) => {
        try {
            const url = qs.stringify({
                url: "/api/channels",
                query: { serverId: params?.serverId }
            })
            await axios.post(url, data)
            form.reset()
            router.refresh()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white dark:bg-[#313338] text-black p-0 overflow-hidden max-w-md rounded-lg shadow-lg py-4">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-2xl text-center font-bold dark:text-white">
                        Create Channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            {/* server name field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300">
                                            Channel Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                placeholder="Enter Channel Name"
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:bg-[#1e1f22] dark:text-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300">
                                            Channel Type
                                        </FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className="w-full bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none dark:bg-[#1e1f22] dark:text-white"
                                                >
                                                    <SelectValue placeholder="Select a channel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-white dark:bg-[#1e1f22]">
                                                {Object.values(ChannelType).map((type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                        className="capitalize text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700/50 cursor-pointer"
                                                    >
                                                        {type.toLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* submit button */}
                        <DialogFooter className="bg-gray-100 dark:bg-[#2b2d31] px-6 py-4">
                            <Button variant={"primary"} disabled={isLoading} type="submit">
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}

export default CreateChannelModal