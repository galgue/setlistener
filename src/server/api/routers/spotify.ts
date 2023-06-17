import { refreshSpotifyToken, SPOTIFY_TOKEN } from "~/server/spotifyApi";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const spotifyRouter = createTRPCRouter({
  getToken: publicProcedure.query(async () => {
    return await refreshSpotifyToken();
  }),
  getCachedToken: publicProcedure.query(() => {
    return SPOTIFY_TOKEN;
  }),
});
