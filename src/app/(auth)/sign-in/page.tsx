"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { EyeIcon, EyeClosed } from "lucide-react"
import ProtectedPage from "@/components/pages/Protected"
import { signIn } from "@/lib/auth-client"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [isView, setIsView] = useState(false)

    const handleGoogleSignIn = async () => {
        setLoading(true)
        setError(null)
        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/home",
            })
        } catch (err) {
            console.error(err)
            setError("Failed to sign in with Google. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    const handleEmailSignIn = async () => {
        setLoading(true)
        setError(null)
        try {
            const user = await signIn.email({
                email: email,
                password: password,
                callbackURL: "/home",
            })
            if (!user.data) return setError("Wrong Email or Password.")
        } catch (err) {
            console.error(err)
            setError("Failed to sign in with Email. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <ProtectedPage mode="auth">
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-sm">
                    <div className={cn("flex flex-col gap-6")}>
                        <Card>
                            <CardHeader>
                                <Image
                                    src={"/feedu-logo.webp"}
                                    alt="Feedu logo"
                                    width={32}
                                    height={32}
                                    className="mx-auto"
                                ></Image>
                                <CardTitle className="text-xl text-center">
                                    Login to your Feedu account.
                                </CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="rai@feedu.xyz"
                                                required
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">
                                                    Password
                                                </Label>
                                            </div>
                                            <div className="relative flex items-center">
                                                <Input
                                                    id="password"
                                                    type={
                                                        isView
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    required
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setIsView(!isView)
                                                    }
                                                    className="absolute right-2 text-gray-500"
                                                >
                                                    {isView ? (
                                                        <EyeIcon className="w-5 h-5" />
                                                    ) : (
                                                        <EyeClosed className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        {error && (
                                            <p className="text-sm text-red-500">
                                                {error}
                                            </p>
                                        )}
                                        <div className="flex flex-col gap-3">
                                            <Button
                                                type="submit"
                                                className={
                                                    loading
                                                        ? "w-full cursor-not-allowed opacity-50"
                                                        : "w-full"
                                                }
                                                disabled={loading}
                                                onClick={handleEmailSignIn}
                                            >
                                                {loading
                                                    ? "Logging in..."
                                                    : "Login"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full"
                                                onClick={handleGoogleSignIn}
                                            >
                                                <Image
                                                    src={
                                                        "/assets/google-icon.svg"
                                                    }
                                                    width={18}
                                                    height={18}
                                                    alt="Google Icon"
                                                />
                                                <span className="ml-2">
                                                    Login with Google
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center text-sm">
                                        Don&apos;t have an account?{" "}
                                        <a
                                            href="/sign-up"
                                            className="underline underline-offset-4"
                                        >
                                            Sign up
                                        </a>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedPage>
    )
}
