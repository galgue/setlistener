import { z } from "zod";

export const SpotifyArtistSchema = z.object({
  external_urls: z.object({
    spotify: z.string(),
  }),
  genres: z.array(z.string()).optional(),
  href: z.string(),
  id: z.string(),
  images: z
    .array(
      z.object({
        height: z.number(),
        url: z.string(),
        width: z.number(),
      })
    )
    .optional(),
  name: z.string(),
  popularity: z.number().optional(),
  type: z.string(),
  uri: z.string(),
});
