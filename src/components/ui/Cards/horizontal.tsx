import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { PlusIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export type Note = {
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

type HorizontalCardProviderProps = {
    children: ReactNode
}

export function HorizontalCardProvider({
    children,
}: HorizontalCardProviderProps) {
    return (
        <div className="my-7 w-full overflow-x-hidden">
            <ScrollArea className="w-fit max-w-fit mt-4">
                <div className="flex w-fit max-w-screen flex-row flex-nowrap gap-4 pb-4">
                    {children}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

type HorizontalCardProps = {
    note?: Note
    onClick?: () => void
}

export function HorizontalCard({ note, onClick }: HorizontalCardProps) {
    if (!note) {
        return (
            <Card
                onClick={onClick}
                className="w-[250px] flex-shrink-0 aspect-[9/16] flex items-center justify-center cursor-pointer hover:bg-muted transition-colors"
            >
                <PlusIcon className="w-8 h-8 text-muted-foreground" />
            </Card>
        )
    }

    return (
        <Link href={note.href ?? "#"}>
            <Card className="w-[250px] flex-shrink-0 aspect-[9/16] p-4 flex flex-col justify-between cursor-pointer hover:bg-muted transition-colors overflow-hidden">
                {note.type === "image" && note.imageUrl ? (
                    <div className="relative w-full h-[60%] rounded-md overflow-hidden">
                        <Image
                            src={note.imageUrl}
                            alt={note.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="h-[60%] w-full bg-muted/30 rounded-md flex items-center justify-center text-sm text-muted-foreground px-2 text-center">
                        {note.markdownContent?.slice(0, 80) || "No content"}
                    </div>
                )}

                <div className="mt-2 text-left">
                    <h4 className="text-sm font-medium line-clamp-2">
                        {note.title}
                    </h4>
                    {note.level && note.subject && (
                        <div className="text-xs text-muted-foreground mt-1">
                            {note.level} • {note.subject}
                        </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1">
                        {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </Card>
        </Link>
    )
}
