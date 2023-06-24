import { getArtistInfo, getSong } from "~/server/spotifyApi";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import type { SpotifySong } from "~/server/spotifyApi/schemas";
import { getUserProfile } from "~/server/spotifyApi/getUserProfile";

export const spotifyRouter = createTRPCRouter({
  getArtistInfo: publicProcedure
    .input(
      z.object({
        artistName: z.string(),
      })
    )
    .query(async ({ input }) => {
      const response = await getArtistInfo(input.artistName);
      const artist = response.artists.items[0];

      const smallestImage = artist?.images?.reduce((acc, image) => {
        if (!acc) return image;
        if (image.width < acc.width) return image;
        return acc;
      }, artist.images[0]);

      return {
        ...artist,
        bannerImage: smallestImage,
      };
    }),
  getSong: publicProcedure
    .input(
      z.object({
        songName: z.string(),
        artist: z.string(),
        coverArtist: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { songName, artist, coverArtist } = input;
      const response = await getSong(songName, artist);

      let song = response.tracks.items.find((song) => {
        if (song.artists[0]?.name.toLowerCase() === artist.toLowerCase()) {
          return song;
        }
      });

      if (!song && coverArtist) {
        song = response.tracks.items.find((song) => {
          if (
            song.artists[0]?.name.toLowerCase() === coverArtist.toLowerCase()
          ) {
            return song;
          }
        });
      }

      if (!song) {
        return undefined;
      }

      const smallestImage = song?.album?.images?.reduce((acc, image) => {
        if (!acc) return image;
        if (image.width < acc.width) return image;
        return acc;
      }, song.album.images[0]);

      return {
        ...song,
        bannerImage: smallestImage,
      } as SpotifySong;
    }),
  getUserProfile: publicProcedure
    .input(
      z.object({
        accessToken: z.string(),
        tokenType: z.string(),
      })
    )
    .query(async ({ input }) => {
      return getUserProfile(input.tokenType, input.accessToken);
    }),
});
