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

export default function HomePage() {
    const { data } = useSession()
    return (
        <ProtectedPage>
            <div className="flex h-screen w-full">
                <DesktopSidebar />
                <div className="flex-1 flex flex-col">
                    <header className="h-16 border-b px-4 md:px-6 flex items-center gap-4">
                        <div className="hidden md:flex md:flex-col">
                            <h1 className="text-lg font-semibold">Home</h1>
                        </div>
                        <MobileSidebar />
                    </header>
                    <main className="flex-1 overflow-auto p-4 md:p-6 mt-3">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    Hello, {data?.user.name}.
                                </h2>
                                <p className="text-base md:text-lg text-muted-foreground">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Corrupti sapiente
                                    similique quam aliquid velit quidem officia
                                    ea, eveniet est molestias?
                                </p>
                            </div>

                            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base md:text-lg">
                                            Lorem, ipsum.
                                        </CardTitle>
                                        <CardDescription className="text-sm">
                                            Lorem ipsum dolor sit amet.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* <Button asChild className={loading ? "w-full cursor-not-allowed opacity-50" : "w-full"}>
                    <Link href={socials?.whatsapp || "#"} target="_blank" rel="noopener noreferrer">
                      Join WhatsApp group
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button> */}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base md:text-lg">
                                            Lorem, ipsum.
                                        </CardTitle>
                                        <CardDescription className="text-sm">
                                            Lorem ipsum dolor sit.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* <Button asChild className={loading ? "w-full cursor-not-allowed opacity-50" : "w-full"} variant={"outline"}>
                    <Link href={socials?.discord || "#"} target="_blank" rel="noopener noreferrer">
                      Join Discord server
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button> */}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedPage>
    )
}
