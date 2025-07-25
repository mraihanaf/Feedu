// src/server/context.ts
import { auth } from "@/lib/auth"

export async function createContext({ req }: { req: Request }) {
    const session = await auth.api.getSession(req) // temporary workaround

    return {
        session,
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>
