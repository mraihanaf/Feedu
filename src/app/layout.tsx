// src/app/layout.tsx (Server Component — no "use client")
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import TRPCProvider from "./_providers/trpc-provider"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata = {
    title: "Feedu",
    description:
        "Competitions, Events Aggregator & Notes Sharing for Students.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <TRPCProvider>{children}</TRPCProvider>
                <Toaster />
            </body>
        </html>
    )
}
