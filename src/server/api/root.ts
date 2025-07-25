// src/server/api/root.ts
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().optional() }).optional())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? 'World'}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
