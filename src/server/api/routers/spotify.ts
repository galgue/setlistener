import imageToBase64 from "image-to-base64";
import { z } from "zod";
import {
  getArtistInfo,
  getSong,
  createPlaylist,
  addPlaylistCoverImage,
  addSongsToPlaylist,
} from "~/server/spotifyApi";
import { type SpotifySong } from "~/server/spotifyApi/schemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

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
  createPlaylist: publicProcedure
    .input(
      z.object({
        songUris: z.array(z.string()),
        artistName: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { songUris, artistName } = input;

      const playlist = await createPlaylist(artistName);

      const artistResponse = await getArtistInfo(artistName);
      const artist = artistResponse.artists.items[0];
      const image = artist?.images?.at(-1)?.url;
      if (image) {
        const imageBase64 = await imageToBase64(image);
        await addPlaylistCoverImage(playlist.id, imageBase64);
      }
      await addSongsToPlaylist(playlist.id, songUris);

      return playlist;
    }),
});
