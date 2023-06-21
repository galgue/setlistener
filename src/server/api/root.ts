import { createTRPCRouter } from "~/server/api/trpc";
import { artistsRouter } from "./routers/artists";
import { spotifyRouter } from "./routers/spotify";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  artist: artistsRouter,
  spotify: spotifyRouter,
});

export const apiCaller = appRouter.createCaller({});

// export type definition of API
export type AppRouter = typeof appRouter;
