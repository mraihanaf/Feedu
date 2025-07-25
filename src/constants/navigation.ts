import { TrophyIcon, UsersIcon } from "lucide-react"

import type { LucideIcon } from "lucide-react"

interface NavigationItem {
    title: string
    icon: LucideIcon
    url: string
}

type NavigationItems = NavigationItem[]

export const navigationItems: NavigationItems = [
    {
        title: "Discover Competitions",
        icon: TrophyIcon,
        url: "/competitions",
    },
    {
        title: "Discover Events",
        icon: UsersIcon,
        url: "/events",
    },
]
