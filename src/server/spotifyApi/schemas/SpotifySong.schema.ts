import { z } from "zod";
import { SpotifyArtistSchema } from "./SpotifyArtist.schema";

export const SpotifySongSchema = z
  .object({
    album: z.object({
      album_type: z.string(),
      external_urls: z.object({
        spotify: z.string(),
      }),
      href: z.string(),
      id: z.string(),
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
  })
  .and(
    z
      .object({
        bannerImage: z
          .object({
            height: z.number(),
            url: z.string(),
            width: z.number(),
          })
          .optional(),
        album: z.object({
          images: z.array(
            z.object({
              height: z.number(),
              url: z.string(),
              width: z.number(),
            })
          ),
        }),
      })
      .transform((song) => {
        if (song.bannerImage) return song;
        const smallestImage = song?.album?.images?.reduce((acc, image) => {
          if (!acc) return image;
          if (image.width < acc.width) return image;
          return acc;
        }, song.album.images[0]);

        return {
          bannerImage: smallestImage,
        };
      })
  );

export type SpotifySong = z.infer<typeof SpotifySongSchema>;
