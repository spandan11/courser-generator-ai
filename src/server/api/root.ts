import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { courseRouter } from "@/server/api/routers/course";
import { chapterRouter } from "@/server/api/routers/chapter";
import { stripeRouter } from "@/server/api/routers/stripe";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  course: courseRouter,
  chapter: chapterRouter,
  stripe: stripeRouter,
  test: publicProcedure.query(() => {
    return {
      greeting: `Hello `,
    };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
