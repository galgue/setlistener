import { z } from "zod";

export const SetlistTourSchema = z.object({
  name: z.string(),
});
