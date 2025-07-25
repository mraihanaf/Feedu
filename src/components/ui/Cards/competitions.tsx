import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useState } from "react"

type Competition = {
    competitionName: string
    description: string
    level: string[]
    category: string[]
    isPaid: boolean
    sourceUrl: string
    posterImageUrl: string
    initialSaveCount?: number // optional prop for real data
}

export function CompetitionsCard({
    competition,
}: {
    competition: Competition
}) {
    const [saved, setSaved] = useState(false)
    const [saveCount, setSaveCount] = useState(
        competition.initialSaveCount ?? 0,
    )

    const handleSaveToggle = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setSaved((prev) => !prev)
        setSaveCount((prev) => (saved ? prev - 1 : prev + 1))
    }

    return (
        <Card className="relative aspect-[9/16] w-[160px] md:w-[200px] lg:w-[320px] xl:w-[320px] cursor-pointer overflow-hidden transition-colors hover:bg-muted group">
            <Image
                src={competition.posterImageUrl}
                alt={competition.competitionName}
                fill
                sizes="100vw"
                className="object-cover"
                draggable="false"
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
                href={competition.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                    <h3 className="text-sm md:text-base font-semibold line-clamp-2">
                        {competition.competitionName}
                    </h3>
                    <p className="text-xs md:text-sm text-white/90 line-clamp-2">
                        {competition.description}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1">
                        <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                            {competition.isPaid ? "Paid" : "Free"}
                        </Badge>

                        {competition.level.map((lvl, i) => (
                            <Badge
                                key={`level-${i}`}
                                className="bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                            >
                                {lvl}
                            </Badge>
                        ))}

                        {competition.category.map((cat, i) => (
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
