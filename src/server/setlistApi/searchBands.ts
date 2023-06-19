import { z } from "zod";
import { ArtistSchema } from "./Setlist.schemas";

const SearchBandsResponseSchema = z.object({
  artist: z.array(ArtistSchema),
  total: z.number(),
  page: z.number(),
  itemsPerPage: z.number(),
});

export const searchBands = async (searchTerm: string) => {
  const response = await fetch(
    `https://api.setlist.fm/rest/1.0/search/artists?artistName=${searchTerm}&p=1&sort=relevance`,
    {
      headers: {
        "x-api-key": process.env.PLAYLISTS_API_KEY as string,
        Accept: "application/json",
      },
    }
  );

  return SearchBandsResponseSchema.parse(await response.json());
};