import { z } from "zod";

export const SetlistArtistSchema = z.object({
  mbid: z.string(),
  name: z.string(),
  sortName: z.string(),
  disambiguation: z.string().optional(),
  url: z.string().optional(),
});
