import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

import Image from "next/image";
import { redirect } from "next/navigation";

import { NavigationAction } from "@/components/navigation/Navigation-Action";
import { NavigationItem } from "@/components/navigation/Navigation-Item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {
    const user = await currentUser();
    if (!user) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    userId: user.id
                }
            }
        }
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full py-3 dark:bg-[#1E1F22] bg-[#E3E5E8]">
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id}>
                        <NavigationItem
                            id={server.id}
                            name={server.serverName}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                )
                )}
            </ScrollArea>
            <ModeToggle />
            <UserButton
                appearance={{
                    elements: {
                        userButtonAvatarBox: "h-[48px] w-[48px]"
                    }
                }}
            />
        </div>
    )
}
