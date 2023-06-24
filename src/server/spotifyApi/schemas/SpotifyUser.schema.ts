import { z } from "zod";

export const SpotifyUserSchema = z.object({
  display_name: z.string(),
  email: z.string().optional(),
  external_urls: z.object({
    spotify: z.string(),
  }),
  href: z.string(),
  id: z.string(),
  images: z
    .array(
      z.object({
        height: z.number().nullable(),
        url: z.string(),
        width: z.number().nullable(),
      })
    )
    .optional(),
  type: z.string(),
  uri: z.string(),
});

export type SpotifyUser = z.infer<typeof SpotifyUserSchema>;
