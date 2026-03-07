"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
    const { resolvedTheme } = useTheme();

    return (
        <SignUp
            appearance={{
                baseTheme: resolvedTheme === "dark" ? dark : undefined,
                elements: {
                    cardBox: {
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    },
                },
            }}
        />
    );
}