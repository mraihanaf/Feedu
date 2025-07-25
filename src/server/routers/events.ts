import { z } from "zod"
import { router, publicProcedure } from "@/server/trpc"
import { events } from "@/db/schema"
import { and, desc, ilike, lt, eq } from "drizzle-orm"
import db from "@/db"
import { sql } from "drizzle-orm"

export const eventsRouter = router({
    getInfiniteEvents: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).default(6),
                cursor: z.string().optional(), // last ID from previous page
                search: z.string().optional(),
                audience: z.union([z.string(), z.array(z.string())]).optional(),
                category: z.union([z.string(), z.array(z.string())]).optional(),
                isPaid: z.boolean().optional(),
                sort: z.enum(["newest", "oldest"]).optional(),
            }),
        )
        .query(async ({ input }) => {
            const {
                limit,
                cursor,
                search,
                audience,
                category,
                isPaid,
                sort = "newest",
            } = input

            const whereClauses = []

            if (search) {
                whereClauses.push(ilike(events.eventName, `%${search}%`))
            }

            if (audience) {
                if (Array.isArray(audience)) {
                    whereClauses.push(
                        sql`EXISTS (SELECT 1 FROM unnest(lower(${events.audience})) AS a WHERE a = ANY(${audience.map((v) => v.toLowerCase())}))`,
                    )
                } else {
                    whereClauses.push(
                        sql`EXISTS (SELECT 1 FROM unnest(lower(${events.audience})) AS a WHERE a = lower(${audience}))`,
                    )
                }
            }

            if (category) {
                if (Array.isArray(category)) {
                    whereClauses.push(
                        sql`EXISTS (SELECT 1 FROM unnest(lower(${events.category})) AS c WHERE c = ANY(${category.map((v) => v.toLowerCase())}))`,
                    )
                } else {
                    whereClauses.push(
                        sql`EXISTS (SELECT 1 FROM unnest(lower(${events.category})) AS c WHERE c = lower(${category}))`,
                    )
                }
            }

            if (typeof isPaid === "boolean") {
                whereClauses.push(eq(events.isPaid, isPaid))
            }

            if (cursor) {
                whereClauses.push(lt(events.id, cursor))
            }

            const where =
                whereClauses.length > 0 ? and(...whereClauses) : undefined

            const results = await db
                .select()
                .from(events)
                .where(where)
                .orderBy(sort === "newest" ? desc(events.id) : events.id)
                .limit(limit + 1) // fetch one more to check if there's next page

            const hasNextPage = results.length > limit
            const data = hasNextPage ? results.slice(0, -1) : results

            return {
                items: data,
                nextCursor: hasNextPage ? data[data.length - 1]?.id : null,
            }
        }),
})
