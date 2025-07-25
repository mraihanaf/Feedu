"use client"

import ProtectedPage from "@/components/pages/Protected"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/layouts/Sidebars/Mobile"
import { DesktopSidebar } from "@/components/layouts/Sidebars/Desktop"
import { useSession } from "@/lib/auth-client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, levels, fee, sortOptions } from "@/constants/competitionFilters"
import { Input } from "@/components/ui/input"
import { CompetitionsCard } from "@/components/ui/Cards/competitions"

export default function CompetitionsPage() {
  const { data } = useSession()

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
                  Discover and participate in various competitions tailored for students. Join the community and enhance your skills!
                </p>
                <hr />
                <div className="flex flex-wrap gap-4 my-4">
                  <div className="flex mr-auto gap-4">
                    <Input placeholder="Search competitions" />
                    <Button>Search</Button>
                  </div>
                  {[categories, levels, fee, sortOptions].map((filter) => (
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
                        <CompetitionsCard competition={{
                            competitionName: "Jakarta Coding Competition",
                            description: "lorem1 ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
                            level: ["High School", "Junior High School"],
                            category: ["Technology", "Science"],
                            isPaid: false,
                            sourceUrl: "https://example.com",
                            posterImageUrl: "/assets/poster.png"
                        }} key={i}/>
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
