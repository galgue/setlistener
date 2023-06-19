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

export const SongSchema = z.object({
  album: z.object({
    album_type: z.string(),
    external_urls: z.object({
      spotify: z.string(),
    }),
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
    release_date: z.string(),
    release_date_precision: z.string(),
    total_tracks: z.number(),
    type: z.string(),
    uri: z.string(),
  }),
  artists: z.array(SpotifyArtistSchema),
  disc_number: z.number(),
  duration_ms: z.number(),
  explicit: z.boolean(),
  external_ids: z.object({
    isrc: z.string(),
  }),
  external_urls: z.object({
    spotify: z.string(),
  }),
  href: z.string(),
  id: z.string(),
  is_local: z.boolean(),
  name: z.string(),
  popularity: z.number(),
  preview_url: z.string().nullable().optional(),
  type: z.string(),
  uri: z.string(),
});

export type SpotifySong = z.infer<typeof SongSchema>;
