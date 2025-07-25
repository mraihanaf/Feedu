// src/server/api/root.ts
import { competitions } from '@/db/schema';
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { competitionsRouter } from '../routers/competitions';

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().optional() }).optional())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? 'World'}`,
      };
    }),
    competitions: competitionsRouter,
})



// export type definition of API
export type AppRouter = typeof appRouter;
