import Link from "next/link"

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-3xl font-bold">
                Oops, something went wrong :/
            </h1>
            <Link href={"/"} className="m-10 hover:underline cursor-pointer">
                Go Back
            </Link>
        </div>
    )
}
