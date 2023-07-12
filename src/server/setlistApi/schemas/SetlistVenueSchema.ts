import { z } from "zod";
import { SetlistCitySchema } from "./SetlistCity.Schema";

export const SetlistVenueSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  city: SetlistCitySchema,
});
