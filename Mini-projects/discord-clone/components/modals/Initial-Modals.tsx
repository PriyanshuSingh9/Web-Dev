"use client"
// zod provides a way to define and check data structures at runtime.
import * as z from "zod"

// react-hook-form simplifies form state and validation.
import { useForm } from "react-hook-form"

// The resolver adapts a zod schema to react-hook-form's validation system.
import { zodResolver } from "@hookform/resolvers/zod"

// These hooks are used below to avoid rendering on the server.
import { useEffect, useState } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FileUpload from "@/components/FileUpload"

const InitialModals = () => {
    // Because this component uses client-only hooks and may run in a Next.js
    // environment, we delay rendering until after the component mounts in the
    // browser. The `mounted` flag prevents any mismatches between server and
    // client HTML.
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    // Define the validation rules for our form using zod.
    // Each property corresponds to a field we expect from the user.
    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Server name is required"
        }),
        imageUrl: z.string().min(1, {
            message: "Image Url is required"
        })
    })

    // Initialize the form via react-hook-form, passing our zod schema
    // for validation. defaultValues specifies initial empty strings.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })

    // isLoading will be true when the form is in the process of submitting.
    const isLoading = form.formState.isSubmitting

    // This function is called when the form is successfully submitted.
    // z.infer<typeof formSchema> automatically types the data based on our schema.
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    if (!mounted) {
        return null
    }

    return (
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-md rounded-lg shadow-lg py-4">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create your Server
                    </DialogTitle>
                    <DialogDescription className="text-sm text-center text-zinc-500">
                        Add a server to connect with people
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* image upload field */}
                        <div className="px-6 flex justify-center">
                            <FormField
                                name="imageUrl"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70">
                                            Server Image
                                        </FormLabel>
                                        <FormControl>
                                            <FileUpload
                                                endpoint="serverImage"
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="w-full h-32"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* server name field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-3 px-6">
                                    <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70">
                                        Server Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="My Cool Server"
                                            className="w-full bg-zinc-100 border-0 focus-visible:ring-2 focus-visible:ring-primary text-black focus-visible:ring-offset-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* submit button */}
                        <DialogFooter className="bg-gray-100 px-6 py-4">
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

export default InitialModals