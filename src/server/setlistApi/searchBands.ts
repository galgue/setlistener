import { z } from "zod";
import { ArtistSchema } from "./Setlist.schemas";
import { setlistFetcher } from "./setlistFetcher";

const SearchBandsResponseSchema = z.object({
  artist: z.array(ArtistSchema),
  total: z.number(),
  page: z.number(),
  itemsPerPage: z.number(),
});

export const searchBands = async (searchTerm: string) => {
  const response = await setlistFetcher(
    `https://api.setlist.fm/rest/1.0/search/artists?artistName=${searchTerm}&p=1&sort=relevance`
  );

  if (response.status === 404) {
    return SearchBandsResponseSchema.parse({
      artist: [],
      total: 0,
      page: 0,
      itemsPerPage: 0,
    });
  }

  return SearchBandsResponseSchema.parse(await response.json());
};
