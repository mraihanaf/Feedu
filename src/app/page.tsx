import { Trophy, Calendar, UserRound } from "lucide-react"
import Image from "next/image"

export default function Home() {
    return (
        <div className="font-sans min-h-screen flex flex-col items-center justify-between bg-background text-foreground p-0">
            {/* Hero Section */}
            <section className="w-full flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-b from-primary/10 to-transparent">
                <Image
                    src="/assets/feedu-logo.webp"
                    alt="Feedu Logo"
                    width={80}
                    height={80}
                    className="mb-6"
                />
                <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 tracking-tight">
                    Feedu
                </h1>
                <p className="text-lg sm:text-xl text-center max-w-2xl mb-8 text-muted-foreground">
                    Competitions & Events Aggregator for Students. Discover,
                    join, and share knowledge with the student community.
                </p>
                <a
                    href="/sign-in"
                    className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow hover:bg-primary/90 transition mb-2"
                >
                    Get Started
                </a>
                <span className="text-sm text-muted-foreground">
                    It{"'"}s free for students!
                </span>
            </section>

            {/* Features Section */}
            <section className="w-full max-w-5xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-card rounded-xl shadow p-6 flex flex-col items-center text-center">
                    <Trophy size={48} className="mb-4 text-primary" />
                    <h2 className="font-bold text-lg mb-2">
                        Competition Aggregator
                    </h2>
                    <p className="text-muted-foreground">
                        Find and join the latest student competitions from
                        various fields, all in one place.
                    </p>
                </div>
                <div className="bg-card rounded-xl shadow p-6 flex flex-col items-center text-center">
                    <Calendar size={48} className="mb-4 text-primary" />
                    <h2 className="font-bold text-lg mb-2">
                        Events for Students
                    </h2>
                    <p className="text-muted-foreground">
                        Stay updated with seminars, workshops, and campus events
                        tailored for students.
                    </p>
                </div>
                <div className="bg-card rounded-xl shadow p-6 flex flex-col items-center text-center">
                    <UserRound size={48} className="mb-4 text-primary" />
                    <h2 className="font-bold text-lg mb-2">
                        Made for Students
                    </h2>
                    <p className="text-muted-foreground">
                        {" "}
                        Discover competitions and events, curated to support
                        your learning and growth as a student.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-8 flex flex-col items-center gap-2 border-t border-border bg-background/80 mt-8">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Feedu. All rights
                    reserved.
                </p>
                <div className="flex gap-4">
                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-muted-foreground"
                    >
                        GitHub
                    </a>
                    <a
                        href="mailto:contact@feedu.com"
                        className="hover:underline text-muted-foreground"
                    >
                        Contact
                    </a>
                </div>
            </footer>
        </div>
    )
}
