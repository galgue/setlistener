import { z } from "zod";
import { SpotifySongSchema } from "./schemas";

const GetSongResponseSchema = z.object({
  tracks: z.object({
    href: z.string(),
    items: z.array(SpotifySongSchema),
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
      next: {
        revalidate: process.env.NODE_ENV === "production" ? 60 * 60 * 24 : 0,
      },
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
