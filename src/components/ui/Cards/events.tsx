import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useState } from "react"

type Event = {
  eventName: string
  description: string
  audience: string[]
  category: string[]
  isPaid: boolean
  eventDate?: string | null // ISO format
  sourceUrl: string
  posterImageUrl: string
  initialSaveCount?: number
}

export function EventsCard({ event }: { event: Event }) {
  const [saved, setSaved] = useState(false)
  const [saveCount, setSaveCount] = useState(event.initialSaveCount ?? 0)

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setSaved((prev) => !prev)
    setSaveCount((prev) => (saved ? prev - 1 : prev + 1))
  }

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="relative aspect-[9/16] w-[160px] md:w-[200px] lg:w-[320px] xl:w-[320px] cursor-pointer overflow-hidden transition-colors hover:bg-muted group">
      <Image
        src={event.posterImageUrl}
        alt={event.eventName}
        fill
        sizes="100vw"
        className="object-cover"
        draggable={false}
      />

      <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
        <button
          onClick={handleSaveToggle}
          className="rounded-full bg-black/50 hover:bg-black/70 text-white p-1 transition"
        >
          {saved ? (
            <BookmarkCheck className="h-5 w-5" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </button>
        <span className="text-xs text-white bg-black/40 px-1.5 py-0.5 rounded-md">
          {saveCount}
        </span>
      </div>

      <Link
        href={event.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
          <h3 className="text-sm md:text-base font-semibold line-clamp-2">
            {event.eventName}
          </h3>
          {event.eventDate && (
            <p className="text-xs text-white/80">{formatDate(event.eventDate)}</p>
          )}
          <p className="text-xs md:text-sm text-white/90 line-clamp-2">
            {event.description}
          </p>

          <div className="mt-2 flex flex-wrap gap-1">
            <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm">
              {event.isPaid ? "Paid" : "Free"}
            </Badge>

            {event.audience.map((aud, i) => (
              <Badge
                key={`audience-${i}`}
                className="bg-white/10 text-white border border-white/20 backdrop-blur-sm"
              >
                {aud}
              </Badge>
            ))}

            {event.category.map((cat, i) => (
              <Badge
                key={`category-${i}`}
                className="bg-white/10 text-white border border-white/20 backdrop-blur-sm"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </Card>
  )
}
