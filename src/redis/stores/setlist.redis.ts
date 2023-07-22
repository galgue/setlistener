import { z } from "zod";
import { createStore } from "./createStore";

const RelevantSongResultSchema = z.array(
  z.object({
    name: z.string(),
    occurrences: z.number(),
    cover: z.string().optional(),
  })
);

export const setlistStore = createStore("setlist", RelevantSongResultSchema);
