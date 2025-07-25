"use client"

import ProtectedPage from "@/components/pages/Protected"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/layouts/Sidebars/Mobile"
import { DesktopSidebar } from "@/components/layouts/Sidebars/Desktop"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
    categories,
    audience,
    fee,
    sortOptions,
} from "@/constants/eventFilters"
import { EventsCard } from "@/components/ui/Cards/events"
import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { api } from "@/lib/trpc/react"

export default function EventsPage() {
    // State filter
    const [search, setSearch] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedAudience, setSelectedAudience] = useState<string>()
    const [selectedCategory, setSelectedCategory] = useState<string>()
    const [selectedFee, setSelectedFee] = useState<string>()
    const [selectedSort, setSelectedSort] = useState<"newest" | "oldest">(
        "newest",
    )

    const { ref, inView } = useInView()

    // Query tRPC
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = api.events.getInfiniteEvents.useInfiniteQuery(
        {
            limit: 6,
            search: searchQuery,
            audience: selectedAudience,
            category: selectedCategory,
            isPaid:
                selectedFee === "Free"
                    ? false
                    : selectedFee === "Paid"
                      ? true
                      : undefined,
            sort: selectedSort,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    )

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    const handleSearch = () => setSearchQuery(search)

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
                                    Explore a variety of events happening around
                                    you. Join and participate to enhance your
                                    skills and network!
                                </p>
                                <hr />
                                <div className="my-4 flex flex-wrap gap-4">
                                    <div className="flex mr-auto gap-4">
                                        <Input
                                            placeholder="Search events"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        />
                                        <Button onClick={handleSearch}>
                                            Search
                                        </Button>
                                    </div>
                                    <Select
                                        onValueChange={(v) =>
                                            setSelectedCategory(
                                                v === "All Categories"
                                                    ? undefined
                                                    : v,
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.options.map(
                                                (option) => (
                                                    <SelectItem
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        onValueChange={(v) =>
                                            setSelectedAudience(
                                                v === "All" ? undefined : v,
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Audience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {audience.options.map((option) => (
                                                <SelectItem
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        onValueChange={(v) =>
                                            setSelectedFee(
                                                v === "All" ? undefined : v,
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Fee" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fee.options.map((option) => (
                                                <SelectItem
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        onValueChange={(v) => {
                                            if (
                                                v ===
                                                "Most Recent".toLowerCase()
                                            )
                                                setSelectedSort("newest")
                                            else if (
                                                v ===
                                                "Most Popular".toLowerCase()
                                            )
                                                setSelectedSort("oldest")
                                        }}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Sort" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sortOptions.options.map(
                                                (option) => (
                                                    <SelectItem
                                                        key={option}
                                                        value={option.toLowerCase()}
                                                    >
                                                        {option}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-wrap gap-4 my-7 min-h-[120px]">
                                    {isLoading ? (
                                        <p className="text-muted-foreground">
                                            Loading events...
                                        </p>
                                    ) : isError ? (
                                        <p className="text-destructive">
                                            Failed to load events.
                                        </p>
                                    ) : (
                                        data?.pages.flatMap((page) =>
                                            page.items.map((event) => (
                                                <EventsCard
                                                    event={event}
                                                    key={event.id}
                                                />
                                            )),
                                        )
                                    )}
                                    {data &&
                                        data.pages.every(
                                            (page) => page.items.length === 0,
                                        ) && (
                                            <p className="text-muted-foreground">
                                                No events found.
                                            </p>
                                        )}
                                </div>
                                {isFetchingNextPage && (
                                    <p className="text-muted text-center">
                                        Loading more...
                                    </p>
                                )}
                                <div ref={ref} className="h-4" />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedPage>
    )
}
