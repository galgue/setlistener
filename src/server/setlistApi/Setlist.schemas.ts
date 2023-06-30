import { z } from "zod";

export const ArtistSchema = z.object({
  mbid: z.string(),
  name: z.string(),
  sortName: z.string(),
  disambiguation: z.string().optional(),
  url: z.string().optional(),
});

export const CitySchema = z.object({
  id: z.string(),
  name: z.string(),
  state: z.string().optional(),
  stateCode: z.string().optional(),
  coords: z.object({
    lat: z.number(),
    long: z.number(),
  }),
  country: z.object({
    code: z.string(),
    name: z.string(),
  }),
});

export const VenueSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  city: CitySchema,
});

export const TourSchema = z.object({
  name: z.string(),
});

export const SetSchema = z.object({
  song: z.array(
    z.object({
      name: z.string(),
      tape: z.boolean().default(false),
      cover: ArtistSchema.optional(),
    })
  ),
});

export const SetlistSchema = z.object({
  id: z.string(),
  versionId: z.string(),
  eventDate: z.string().transform((date) => new Date(date)),
  lastUpdated: z.coerce.date(),
  artist: ArtistSchema,
  venue: VenueSchema.optional(),
  tour: TourSchema.optional(),
  sets: z.object({
    set: z.array(SetSchema),
  }),
});
