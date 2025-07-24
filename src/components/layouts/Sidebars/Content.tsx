import Image from "next/image"
import { signOut, useSession } from "@/lib/auth-client"
import { navigationItems } from "@/constants/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserIcon, LogOut, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SidebarContent() {
    const pathname = usePathname()
    const handleLogout = async () => {
        await signOut()
    }
    const { data } = useSession()

    return (
        <div className="h-full bg-background flex flex-col w-full">
            <div className="flex items-center gap-2 px-4 py-4 border-b">
                <Image
                    src={"/feedu-logo.webp"}
                    className="bg-transparent"
                    width={24}
                    height={24}
                    alt="Siotics Logo"
                />
                <span className="font-semibold">Feedu</span>
            </div>

            <div className="flex-1 p-2">
                <nav className="space-y-1">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.url}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-secondary text-black ${pathname === item.url && "border border-black"}`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Footer with Dropdown */}
            <div className="p-4 border-t">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-start h-auto p-2 hover:bg-muted"
                        >
                            <div className="flex items-center gap-2 text-sm w-full">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                    <UserIcon></UserIcon>
                                </div>
                                <div className="flex flex-col min-w-0 text-left flex-1 font-medium">
                                    {data?.user.name}
                                </div>
                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="top"
                        align="end"
                        className="w-56"
                        sideOffset={8}
                    >
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-600 focus:text-red-600"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
