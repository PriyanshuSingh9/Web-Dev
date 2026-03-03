import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";
import Image from "next/image";
import { NavigationAction } from "@/components/navigation/Navigation-Action";

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
        </div>
    )
}
