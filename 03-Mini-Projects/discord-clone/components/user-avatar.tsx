import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { memberRole } from "@/lib/generated/prisma/enums"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
    src?: string
    role?: memberRole
    className?: string;
}

export const UserAvatar = ({
    src, role, className
}: UserAvatarProps) => {
    return (
        <Avatar
            className={cn(
                "h-6 w-6 md:h-10 md:w-10",
                role,
                className
            )}
        >
            <AvatarImage src={src} />
        </Avatar >
    )
}
