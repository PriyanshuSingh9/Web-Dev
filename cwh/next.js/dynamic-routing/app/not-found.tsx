import Link from 'next/link'

export default function NotFound() {
    throw new Error("Throwing error to test out error page")
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <h1 className="text-9xl font-extrabold text-foreground/10 absolute -z-10 select-none">
                404
            </h1>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Not Found
            </h2>
            <p className="mt-4 text-lg leading-7 text-foreground/60 max-w-sm">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="mt-10">
                <Link
                    href="/"
                    className="rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground transition-all"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
