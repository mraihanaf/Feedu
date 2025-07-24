"use client"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarContent } from "./Content"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetTitle,
} from "@/components/ui/sheet"

export function MobileSidebar() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
                <VisuallyHidden>
                    <SheetTitle>Sidebar Menu</SheetTitle>
                </VisuallyHidden>
                <SidebarContent />
            </SheetContent>
        </Sheet>
    )
}
