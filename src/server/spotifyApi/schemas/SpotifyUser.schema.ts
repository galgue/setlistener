import { z } from "zod";

export const SpotifyUserSchema = z.object({
  country: z.string(),
  display_name: z.string(),
  email: z.string(),
  explicit_content: z.object({
    filter_enabled: z.boolean(),
    filter_locked: z.boolean(),
  }),
  external_urls: z.object({
    spotify: z.string(),
  }),
  followers: z.object({
    href: z.string(),
    total: z.number(),
  }),
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
  product: z.string(),
  type: z.string(),
  uri: z.string(),
});
