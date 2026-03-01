import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const gintoNord = localFont({
  src: [
    {
      path: "../public/fonts/ABCGintoDiscordNord-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/ABCGintoDiscordNord-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/ABCGintoDiscordNord-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-ginto-nord",
});

const ginto = localFont({
  src: [
    {
      path: "../public/fonts/ABCGintoDiscord-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ABCGintoDiscord-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/ABCGintoDiscord-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ABCGintoDiscord-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-ginto",
});

const ggSans = localFont({
  src: [
    { path: "../public/fonts/ggsans-Normal.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/ggsans-NormalItalic.ttf", weight: "400", style: "italic" },
    { path: "../public/fonts/ggsans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/ggsans-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../public/fonts/ggsans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/ggsans-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../public/fonts/ggsans-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/ggsans-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../public/fonts/ggsans-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../public/fonts/ggsans-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
  ],
  variable: "--font-gg-sans",
});

export const metadata: Metadata = {
  title: "Discord",
  description: "Group Chat That's All Fun & Games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(`${ggSans.className} ${gintoNord.variable} ${ginto.variable} ${ggSans.variable} antialiased`,
          "bg-white dark:bg-[#313338]"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="discord-theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
