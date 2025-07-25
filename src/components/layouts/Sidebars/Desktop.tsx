"use client"
import { SidebarContent } from "./Content"

export function DesktopSidebar() {
    return (
        <div className="hidden md:flex fixed top-0 left-0 h-screen w-64 border-r z-50 bg-background">
            <SidebarContent />
        </div>
    )
}
