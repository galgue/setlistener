import { z } from "zod";
import { SpotifySongSchema } from "./schemas";
import { getSpotifyToken } from "./createToken";
import { spotifyFetcher } from "./spotifyFetcher";

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

  const response = await spotifyFetcher(
    `https://api.spotify.com/v1/search?q=${songNameEncoded}+${artistNameEncoded}&type=track&limit=1&offset=0&include_external=audio&limit=1&offset=0&market=US`
  );

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  const data = GetSongResponseSchema.parse(await response.json());

  return data;
};
