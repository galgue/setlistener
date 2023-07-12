import { z } from "zod";
import { SetlistArtistSchema } from "./SetlistArtist.Schema";
import { SetlistVenueSchema } from "./SetlistVenueSchema";
import { SetlistTourSchema } from "./SetlistTour.schema";
import { SetlistSetSchema } from "./SetlistSet.Schema";

export const SetlistSchema = z.object({
  id: z.string(),
  versionId: z.string(),
  eventDate: z.string().transform((date) => {
    const [day, month, year] = date.split("-");
    if (!day || !month || !year) throw new Error("Invalid date format");
    return new Date(`${year}-${month}-${day}`);
  }),
  lastUpdated: z.coerce.date(),
  artist: SetlistArtistSchema,
  venue: SetlistVenueSchema.optional(),
  tour: SetlistTourSchema.optional(),
  sets: z.object({
    set: z.array(SetlistSetSchema),
  }),
});
