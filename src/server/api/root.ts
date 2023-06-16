import { artistsRouter } from "~/server/api/routers/artists";
import { createTRPCRouter } from "~/server/api/trpc";
import "@total-typescript/ts-reset";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  artist: artistsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
