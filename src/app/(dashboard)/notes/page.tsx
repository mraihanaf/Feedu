"use client"

import ProtectedPage from "@/components/pages/Protected"

import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/layouts/Sidebars/Mobile"
import { DesktopSidebar } from "@/components/layouts/Sidebars/Desktop"
import { useSession } from "@/lib/auth-client"
import { HorizontalCardProvider, HorizontalCard } from "@/components/ui/Cards/horizontal"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories, levels, sortOptions } from "@/constants/notesFilters"
import { Input } from "@/components/ui/input"
import { NotesCard } from "@/components/ui/Cards/notes"

function YourNotesScrollArea() {
  return (
    <div className="my-7 w-full overflow-x-hidden">
      <h3 className="text-lg md:text-xl font-medium">Your Notes</h3>
      <HorizontalCardProvider>
          <HorizontalCard></HorizontalCard>
          <HorizontalCard note={
            {
              createdAt: new Date().toISOString(),
              title: "Example Notes",
              imageUrl: "/assets/poster.png",
              subject: "Math",
              level: "High School",
              id: "example",
              type: "image"
            }
          }/>
          <HorizontalCard note={
            {
              createdAt: new Date().toISOString(),
              title: "Example Notes",
              imageUrl: "/assets/poster.png",
              subject: "Math",
              level: "High School",
              id: "example",
              type: "image"
            }
          }/>
           <HorizontalCard note={
            {
              createdAt: new Date().toISOString(),
              title: "Example Notes",
              imageUrl: "/assets/poster.png",
              subject: "Math",
              level: "High School",
              id: "example",
              type: "image"
            }
          }/>
           <HorizontalCard note={
            {
              createdAt: new Date().toISOString(),
              title: "Example Notes",
              imageUrl: "/assets/poster.png",
              subject: "Math",
              level: "High School",
              id: "example",
              type: "image"
            }
          }/>
           <HorizontalCard note={
            {
              createdAt: new Date().toISOString(),
              title: "Example Notes",
              imageUrl: "/assets/poster.png",
              subject: "Math",
              level: "High School",
              id: "example",
              type: "image"
            }
          }/>
           <HorizontalCard note={
            {
              createdAt: new Date().toISOString(),
              title: "Example Notes",
              imageUrl: "/assets/poster.png",
              subject: "Math",
              level: "High School",
              id: "example",
              type: "image"
            }
          }/>
           <HorizontalCard note={
            {
              createdAt: new Date().toISOString(),
              title: "Example Notes",
              imageUrl: "/assets/poster.png",
              subject: "Math",
              level: "High School",
              id: "example",
              type: "image"
            }
          }/>
      </HorizontalCardProvider>
    </div>
  )
}

export default function NotesPage() {
  const { data } = useSession()

  return (
    <ProtectedPage>
      <div className="flex h-screen w-screen overflow-hidden">
        <DesktopSidebar />
        <div className="flex flex-1 flex-col md:pl-64 min-w-0">
          <header className="h-16 border-b px-4 md:px-6 flex items-center gap-4">
            <div className="hidden md:flex md:flex-col">
              <h1 className="text-lg font-semibold">Notes</h1>
            </div>
            <MobileSidebar />
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-6 mt-3 min-w-0">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold">
                  Share and Discover Notes.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  Explore a variety of notes shared by students. Contribute your own notes to help others!
                </p>

                <YourNotesScrollArea />

                <div>
                  <h3 className="text-lg md:text-xl font-medium">Discover</h3>
                  <div className="my-4 flex flex-wrap items-center gap-4">
                    <Input
                      placeholder="Search Notes"
                      className="w-full md:w-[300px]"
                    />
                    <Button className="self-stretch">Search</Button>

                    {[categories, levels, sortOptions].map((filter) => (
                      <Select key={filter.placeholder}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={filter.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {filter.options.map((option) => (
                            <SelectItem key={`${option}-${Math.random()}`} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 my-7">
                    {[...Array(10)].map((_, i) => (
                      <NotesCard key={i} note={
                        {
                          id: "yes",
                          createdAt: new Date().toISOString(),
                          imageUrl: "/assets/poster.png",
                          title: "Example Notes",
                          type: "image",
                          subject: "Math",
                          level: "High School"
                        }
                      }/>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedPage>
  )
}
