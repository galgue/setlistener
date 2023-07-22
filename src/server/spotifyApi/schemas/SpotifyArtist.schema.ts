import { z } from "zod";

export const SpotifyArtistSchema = z
  .object({
    external_urls: z.object({
      spotify: z.string(),
    }),
    genres: z.array(z.string()).optional(),
    href: z.string(),
    id: z.string(),
    name: z.string(),
    popularity: z.number().optional(),
    type: z.string(),
    uri: z.string(),
  })
  .and(
    z
      .object({
        images: z
          .array(
            z.object({
              height: z.number(),
              url: z.string(),
              width: z.number(),
            })
          )
          .optional(),
        bannerImage: z
          .object({
            height: z.number(),
            url: z.string(),
            width: z.number(),
          })
          .optional(),
      })
      .transform((data) => {
        if (data.bannerImage) {
          return data;
        }
        const smallestImage = data.images?.reduce((acc, image) => {
          if (!acc) return image;
          if (image.width < acc.width) return image;
          return acc;
        }, data.images[0]);

        return {
          bannerImage: smallestImage,
        };
      })
  );
