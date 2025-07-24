"use client"
import ProtectedPage from "@/components/pages/Protected"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/layouts/Sidebars/Mobile"
import { DesktopSidebar } from "@/components/layouts/Sidebars/Desktop"
import { useSession } from "@/lib/auth-client"

export default function NotesPage() {
    const { data } = useSession()
    return (
        <ProtectedPage>
            <div className="flex h-screen w-full">
                <DesktopSidebar />
                <div className="flex-1 flex flex-col">
                    <header className="h-16 border-b px-4 md:px-6 flex items-center gap-4">
                        <div className="hidden md:flex md:flex-col">
                            <h1 className="text-lg font-semibold">Notes</h1>
                        </div>
                        <MobileSidebar />
                    </header>
                    <main className="flex-1 overflow-auto p-4 md:p-6 mt-3"></main>
                </div>
            </div>
        </ProtectedPage>
    )
}
