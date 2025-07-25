"use client"

import { api } from "@/lib/trpc/react";
import { useSession } from "@/lib/auth-client";
import ProtectedPage from "@/components/pages/Protected";
import { DesktopSidebar } from "@/components/layouts/Sidebars/Desktop";
import { MobileSidebar } from "@/components/layouts/Sidebars/Mobile";
import {
  categories,
  levels,
  fee,
  sortOptions,
} from "@/constants/competitionFilters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CompetitionsCard } from "@/components/ui/Cards/competitions";

export default function CompetitionsPage() {
  const { data: session} = useSession();

  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedFee, setSelectedFee] = useState<string>();
  const [selectedSort, setSelectedSort] = useState<"newest" | "oldest">("newest");

  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = api.competitions.getInfiniteCompetitions.useInfiniteQuery(
    session
      ? {
          limit: 6,
          search: searchQuery,
          level: selectedLevel,
          category: selectedCategory,
          isPaid:
            selectedFee === "Free"
              ? false
              : selectedFee === "Paid"
              ? true
              : undefined,
          sort: selectedSort,
        }
      : { limit: 6 }, // fallback input to avoid undefined
    {
      enabled: !!session, // run only when session exists
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSearch = () => {
    setSearchQuery(search);
  };

  return (
    <ProtectedPage>
      <div className="flex h-screen w-full overflow-hidden">
        <DesktopSidebar />
        <div className="flex-1 flex flex-col md:pl-64 min-w-0">
          <header className="h-16 border-b px-4 md:px-6 flex items-center gap-4">
            <div className="hidden md:flex md:flex-col">
              <h1 className="text-lg font-semibold">Competitions</h1>
            </div>
            <MobileSidebar />
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 mt-3 min-w-0">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold">
                  Discover Competitions.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  Discover and participate in various competitions tailored for
                  students. Join the community and enhance your skills!
                </p>
                <hr />
                <div className="flex flex-wrap gap-4 my-4">
                  <div className="flex mr-auto gap-4">
                    <Input
                      placeholder="Search competitions"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={handleSearch}>Search</Button>
                  </div>
                  <Select onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setSelectedFee}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Fee" />
                    </SelectTrigger>
                    <SelectContent>
                      {fee.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(v) => setSelectedSort(v as any)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.options.map((option) => (
                        <SelectItem key={option} value={option.toLowerCase()}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-wrap gap-4 my-7">
                  {data?.pages.flatMap((page) =>
                    page.items.map((comp) => (
                      <CompetitionsCard competition={comp} key={comp.id} />
                    ))
                  )}
                </div>

                {isFetchingNextPage && (
                  <p className="text-muted text-center">Loading more...</p>
                )}
                <div ref={ref} className="h-4" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedPage>
  );
}
