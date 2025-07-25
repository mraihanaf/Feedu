"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Image from "next/image"
import { EyeIcon, EyeClosed } from "lucide-react"

import { SignupSchema } from "@/schema/signup"
import { signIn, signUp } from "@/lib/auth-client"

import ProtectedPage from "@/components/pages/Protected"

type SignupFormValues = z.infer<typeof SignupSchema>

export default function SignUpForm() {
    const [isView, setIsView] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async ({
        email,
        password,
        fullName,
    }: SignupFormValues) => {
        await signUp.email(
            {
                email: email,
                password: password,
                name: fullName,
                callbackURL: "/",
            },
            {
                onRequest: () => {
                    setLoading(true)
                },
                onSuccess: () => {
                    setLoading(false)
                },
                onError: () => {
                    // display the error message
                },
            },
        )
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
                                    className="mx-auto my-5"
                                ></Image>
                                <CardTitle className="text-center">
                                    Sign up for an account
                                </CardTitle>
                                <CardDescription className="text-center">
                                    Enter your details below to create your
                                    account
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-4"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Full Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="John Doe"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="rai@feedu.xyz"
                                                            type="email"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                type={
                                                                    isView
                                                                        ? "text"
                                                                        : "password"
                                                                }
                                                                {...field}
                                                                className="pr-10"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setIsView(
                                                                        !isView,
                                                                    )
                                                                }
                                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                            >
                                                                {isView ? (
                                                                    <EyeIcon className="w-5 h-5" />
                                                                ) : (
                                                                    <EyeClosed className="w-5 h-5" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Confirm Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type={
                                                                isView
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {form.formState.errors.root && (
                                            <p className="text-sm text-red-500">
                                                {
                                                    form.formState.errors.root
                                                        .message
                                                }
                                            </p>
                                        )}

                                        <Button
                                            type="submit"
                                            className={
                                                loading
                                                    ? "w-full cursor-not-allowed opacity-50"
                                                    : "w-full"
                                            }
                                        >
                                            {loading
                                                ? "Signing Up..."
                                                : "Sign Up"}
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full flex items-center justify-center gap-2"
                                            onClick={async () => {
                                                try {
                                                    await signIn.social({
                                                        provider: "google",
                                                        callbackURL:
                                                            "/competitions",
                                                    })
                                                } catch {
                                                    form.setError("root", {
                                                        message:
                                                            "Failed to sign up with Google.",
                                                    })
                                                }
                                            }}
                                        >
                                            <Image
                                                src="/assets/google-icon.svg"
                                                width={18}
                                                height={18}
                                                alt="Google Icon"
                                            />
                                            <span>Sign up with Google</span>
                                        </Button>

                                        <p className="text-center text-sm mt-4">
                                            Already have an account?{" "}
                                            <a
                                                href="/sign-in"
                                                className="underline underline-offset-4"
                                            >
                                                Sign in
                                            </a>
                                        </p>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedPage>
    )
}
