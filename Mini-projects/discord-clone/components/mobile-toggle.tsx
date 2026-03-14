import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { NavigationSidebar } from "@/components/navigation/Navigation-Sidebar"
import { ServerSidebar } from "@/components/server/server-sidebar"

export const MobileToggle = ({
    serverId
}: {
    serverId: string
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-none p-0 flex flex-row gap-0 sm:max-w-none">
                <div className="w-[72px] shrink-0">
                    <NavigationSidebar />
                </div>
                <div className="min-w-0 flex-1">
                    <ServerSidebar serverId={serverId} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
