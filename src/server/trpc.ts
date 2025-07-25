// src/server/trpc.ts
import { initTRPC } from "@trpc/server"
import { Context } from "./context"

const t = initTRPC.context<Context>().create()

const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.session?.user) {
        throw new Error("UNAUTHORIZED")
    }
    return next({
        ctx: {
            user: ctx.session.user,
        },
    })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
