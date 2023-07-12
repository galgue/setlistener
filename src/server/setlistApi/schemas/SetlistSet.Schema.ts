import { z } from "zod";
import { SetlistArtistSchema } from "./SetlistArtist.Schema";

export const SetlistSetSchema = z.object({
  song: z.array(
    z.object({
      name: z.string(),
      tape: z.boolean().default(false),
      cover: SetlistArtistSchema.optional(),
    })
  ),
});
