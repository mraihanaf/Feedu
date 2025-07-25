import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useState } from "react"

type Note = {
    id: string
    title: string
    type: "markdown" | "image"
    markdownContent?: string | null
    imageUrl?: string | null
    createdAt: string
    initialSaveCount?: number
    href?: string
    level?: string
    subject?: string
}

export function NotesCard({ note }: { note: Note }) {
    const [saved, setSaved] = useState(false)
    const [saveCount, setSaveCount] = useState(note.initialSaveCount ?? 0)

    const handleSaveToggle = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setSaved((prev) => !prev)
        setSaveCount((prev) => (saved ? prev - 1 : prev + 1))
    }

    const previewText =
        note.markdownContent?.slice(0, 100).replace(/[#*_`>-]/g, "") ?? ""
    const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    const cardContent = (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end text-white">
            <h3 className="text-sm md:text-base font-semibold line-clamp-2">
                {note.title}
            </h3>
            <p className="text-xs text-white/80 mb-1">{formattedDate}</p>

            {note.type === "markdown" && (
                <p className="text-xs md:text-sm text-white/90 line-clamp-2">
                    {previewText}
                </p>
            )}

            <div className="mt-2 flex flex-wrap gap-1">
                <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm capitalize">
                    {note.type}
                </Badge>

                {note.level && (
                    <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm capitalize">
                        {note.level}
                    </Badge>
                )}

                {note.subject && (
                    <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm capitalize">
                        {note.subject}
                    </Badge>
                )}
            </div>
        </div>
    )

    return (
        <Card className="relative aspect-[9/16] w-[160px] md:w-[200px] lg:w-[320px] xl:w-[320px] cursor-pointer overflow-hidden transition-colors hover:bg-muted group">
            {note.type === "image" && note.imageUrl ? (
                <Image
                    src={note.imageUrl}
                    alt={note.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    draggable={false}
                />
            ) : (
                <div className="absolute inset-0 bg-muted text-muted-foreground p-4 flex items-center justify-center text-sm text-center">
                    No Image
                </div>
            )}

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

            {note.href ? (
                <Link href={note.href} className="absolute inset-0">
                    {cardContent}
                </Link>
            ) : (
                <div className="absolute inset-0">{cardContent}</div>
            )}
        </Card>
    )
}
