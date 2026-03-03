"use client"

import {
    Tooltip,
    TooltipProvider,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";

interface ActionTooltipProps {
    label: string
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}

export const ActionTooltip = ({
    label,
    children,
    side,
    align
}: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    side={side}
                    align={align}
                    className="bg-black/90 text-white border-none font-semibold px-3 py-1.5 rounded-md"
                >
                    <p className="font-semibold text-sm capitalize">
                        {label.toLowerCase()}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}