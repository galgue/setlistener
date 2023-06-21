import { z } from "zod";
import { SetlistSchema } from "./Setlist.schemas";

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
  const response = await fetch(
    `https://api.setlist.fm/rest/1.0/artist/${artistId}/setlists?p=${page}&tourName=${
      tour ?? ""
    }`,
    {
      headers: {
        "x-api-key": process.env.PLAYLISTS_API_KEY as string,
        Accept: "application/json",
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
