// src/server/routers/competitions.ts
import { protectedProcedure, router } from '@/server/trpc';
import { z } from 'zod';
import db from '@/db';

export const competitionsRouter = router({
  getInfiniteCompetitions: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(), // cursor = id of last item
      }),
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;

      const rows = await  db.query.competitions.findMany({})

      let nextCursor: string | null = null;
      if (rows.length > limit) {
        const nextItem = rows.pop(); // remove the extra one
        nextCursor = nextItem?.id ?? null;
      }

      return {
        items: rows,
        nextCursor,
      };
    }),
});
