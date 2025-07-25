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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { categories, audience, fee, sortOptions } from "@/constants/eventFilters"
import { PlusIcon } from "lucide-react"
import { EventsCard } from "@/components/ui/Cards/events"
import { eventNames } from "process"

export default function EventsPage() {
  const { data } = useSession()

  return (
    <ProtectedPage>
      <div className="flex h-screen w-full overflow-hidden">
        <DesktopSidebar />
        <div className="flex-1 flex flex-col md:pl-64 min-w-0">
          <header className="h-16 border-b px-4 md:px-6 flex items-center gap-4">
            <div className="hidden md:flex md:flex-col">
              <h1 className="text-lg font-semibold">Events</h1>
            </div>
            <MobileSidebar />
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-6 mt-3 min-w-0">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold">
                  Discover Events.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  Explore a variety of events happening around you. Join and participate to enhance your skills and network!
                </p>
                <hr />
                <div className="my-4 flex flex-wrap gap-4">
                  <div className="flex mr-auto gap-4">
                    <Input placeholder="Search events" />
                    <Button>Search</Button>
                  </div>
                  {[categories, audience, fee, sortOptions].map((filter) => (
                    <Select key={filter.placeholder}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={filter.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {filter.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 my-7">
                    {[...Array(10)].map((_, i) => (
                      <EventsCard key={i} event={{
                        eventName: "Event Name " + (i + 1),
                        description: "This is a description for event " + (i + 1),
                        audience: ["High School", "College"],
                        category: ["Technology"],
                        isPaid: false,
                        sourceUrl: "https://example.com/event" + (i + 1),
                        posterImageUrl: "/assets/poster.png"
                      }}/>
                    ))}
                  </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedPage>
  )
}
