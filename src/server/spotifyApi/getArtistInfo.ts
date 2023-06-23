import { z } from "zod";
import { SpotifyArtistSchema } from "./schemas";
import { getSpotifyToken } from "./createToken";

const GetArtistInfoResponseSchema = z.object({
  artists: z.object({
    href: z.string(),
    items: z.array(SpotifyArtistSchema),
    limit: z.number(),
    offset: z.number(),
    total: z.number(),
  }),
});

export const getArtistInfo = async (artistName: string) => {
  const artistNameEncoded = encodeURIComponent(`artist:${artistName}`);

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${artistNameEncoded}&type=artist&limit=1&offset=0`,
    {
      next: {
        revalidate: process.env.NODE_ENV === "production" ? 60 * 60 * 24 : 0,
      },
      headers: {
        Authorization: `Bearer ${await getSpotifyToken()}`,
      },
    }
  );

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  return GetArtistInfoResponseSchema.parse(await response.json());
};
