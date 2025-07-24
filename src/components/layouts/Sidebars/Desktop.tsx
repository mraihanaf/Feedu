"use client"
import { SidebarContent } from "./Content"

export function DesktopSidebar() {
    return (
        <div className="hidden md:flex min-w-2xs w-fit h-screen border-r max-w-fit">
            <SidebarContent />
        </div>
    )
}
