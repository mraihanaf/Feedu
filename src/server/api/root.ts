// src/server/api/root.ts
import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { competitionsRouter } from "../routers/competitions"
import { eventsRouter } from "../routers/events"

export const appRouter = router({
    hello: publicProcedure
        .input(z.object({ text: z.string().optional() }).optional())
        .query(({ input }) => {
            return {
                greeting: `Hello ${input?.text ?? "World"}`,
            }
        }),
    competitions: competitionsRouter,
    events: eventsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
