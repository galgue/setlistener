import { z } from "zod";
import { SongSchema } from "./Spotify.schema";

const GetSongResponseSchema = z.object({
  tracks: z.object({
    href: z.string(),
    items: z.array(SongSchema),
    limit: z.number(),
    previous: z.null(),
    total: z.number(),
  }),
});

export const getSong = async (songName: string, artists: string) => {
  const songNameEncoded = encodeURIComponent(`track:${songName}`);
  const artistNameEncoded = encodeURIComponent(`artist:${artists}`);

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${songNameEncoded}+${artistNameEncoded}&type=track&limit=1&offset=0&include_external=audio&limit=1&offset=0&market=US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN as string}`,
      },
    }
  );

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  const data = GetSongResponseSchema.parse(await response.json());

  return data;
};
