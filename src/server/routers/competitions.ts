import { z } from "zod";
import { router, publicProcedure } from "@/server/trpc";
import { competitions } from "@/db/schema";
import { and, desc, ilike, lt, eq } from "drizzle-orm";
import db from "@/db";
import { sql } from "drizzle-orm";

export const competitionsRouter = router({
  getInfiniteCompetitions: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(6),
        cursor: z.string().optional(), // last ID from previous page
        search: z.string().optional(),
        level: z.string().optional(),
        category: z.string().optional(),
        isPaid: z.boolean().optional(),
        sort: z.enum(["newest", "oldest"]).optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const {
        limit,
        cursor,
        search,
        level,
        category,
        isPaid,
        sort = "newest",
      } = input;

      const whereClauses = [];

      if (search) {
        whereClauses.push(ilike(competitions.competitionName, `%${search}%`));
      }

      if (level) {
        whereClauses.push(
          sql`${competitions.level}::jsonb @> ${JSON.stringify([level])}::jsonb`
        );
      }

      if (category) {
        whereClauses.push(
          sql`${competitions.category}::jsonb @> ${JSON.stringify([category])}::jsonb`
        );
      }

      if (typeof isPaid === "boolean") {
        whereClauses.push(eq(competitions.isPaid, isPaid));
      }

      if (cursor) {
        whereClauses.push(lt(competitions.id, cursor));
      }

      const where = whereClauses.length > 0 ? and(...whereClauses) : undefined;

      const results = await db
        .select()
        .from(competitions)
        .where(where)
        .orderBy(sort === "newest" ? desc(competitions.id) : competitions.id)
        .limit(limit + 1); // fetch one more to check if there's next page

      const hasNextPage = results.length > limit;
      const data = hasNextPage ? results.slice(0, -1) : results;

      return {
        items: data,
        nextCursor: hasNextPage ? data[data.length - 1]?.id : null,
      };
    }),
});
