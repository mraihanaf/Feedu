"use client"
import { useSession } from "@/lib/auth-client"
import Spinner from "@/components/ui/Spinner"
import ErrorPage from "@/components/pages/Error"
import { redirect } from "next/navigation"

export default function ProtectedPage({
    children,
    mode = "default",
}: {
    children: React.ReactNode
    mode?: "default" | "auth"
}) {
    const { data, isPending, error } = useSession()
    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner></Spinner>
            </div>
        )
    }

    if (error) {
        return <ErrorPage />
    }

    if (mode === "default") {
        return data ? children : redirect("/sign-in")
    }

    return data ? redirect("/home") : children
}
