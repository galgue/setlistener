import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { searchBands } from "../setlistApi";

export const artistsRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      return await searchBands(input.text);
    }),
});
