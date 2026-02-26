import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from "@/components/providers/theme-provider";


const font = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Discord",
  description: "Team chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${font.className} antialiased`}
        >
          <ThemeProvider
            attribute={"class"}
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
            storageKey="discord-theme">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
