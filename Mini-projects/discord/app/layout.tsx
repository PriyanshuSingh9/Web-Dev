import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/landing-page/Navbar";

import { ClerkProvider } from '@clerk/nextjs'

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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${font.className} antialiased`}
        >
          <div className="min-h-screen bg-[#313338] flex flex-col">
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
