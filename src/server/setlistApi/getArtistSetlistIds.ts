import { z } from "zod";
import { SetlistSchema } from "./Setlist.schemas";
import { setlistFetcher } from "./setlistFetcher";

const GetArtistSetlistResultSchema = z.object({
  itemsPerPage: z.number(),
  page: z.number(),
  total: z.number(),
  setlist: z.array(SetlistSchema),
});

export const getArtistSetlistsIds = async (
  artistId: string,
  page: number,
  tour?: string
) => {
  const response = await setlistFetcher(
    `https://api.setlist.fm/rest/1.0/artist/${artistId}/setlists?p=${page}&tourName=${
      tour ?? ""
    }`,
    {
      next: {
        revalidate: process.env.NODE_ENV === "production" ? 60 * 60 * 24 : 0,
      },
    }
  );

  const setlistResult = GetArtistSetlistResultSchema.parse(
    await response.json()
  );

  const relevantSetlists = setlistResult.setlist.filter(
    (setlist) => setlist.eventDate < new Date()
  );

  return relevantSetlists;
};
