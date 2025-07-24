import { BookIcon, HomeIcon, TrophyIcon, UsersIcon } from "lucide-react"

import type { LucideIcon } from "lucide-react"

interface NavigationItem {
    title: string
    icon: LucideIcon
    url: string
}

type NavigationItems = NavigationItem[]

export const navigationItems: NavigationItems = [
    {
        title: "Home",
        icon: HomeIcon,
        url: "/home",
    },
    {
        title: "Competitions Aggregator",
        icon: TrophyIcon,
        url: "/competitions",
    },
    {
        title: "Events Aggregator",
        icon: UsersIcon,
        url: "/events",
    },
    {
        title: "Notes",
        icon: BookIcon,
        url: "/notes",
    },
]
