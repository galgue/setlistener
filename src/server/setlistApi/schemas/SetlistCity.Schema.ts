import { z } from "zod";

export const SetlistCitySchema = z.object({
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
