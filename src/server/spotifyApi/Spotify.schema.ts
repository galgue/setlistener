import { z } from "zod";

export const SpotifyTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

export const SpotifyArtistSchema = z.object({
  external_urls: z.object({
    spotify: z.string(),
  }),
  followers: z.object({
    href: z.null(),
    total: z.number(),
  }),
  genres: z.array(z.string()),
  href: z.string(),
  id: z.string(),
  images: z.array(
    z.object({
      height: z.number(),
      url: z.string(),
      width: z.number(),
    })
  ),
  name: z.string(),
  popularity: z.number(),
  type: z.string(),
  uri: z.string(),
});
