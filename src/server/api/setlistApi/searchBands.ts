import { z } from "zod";

export const ArtistSchema = z.object({
  mbid: z.string(),
  name: z.string(),
  sortName: z.string(),
  disambiguation: z.string().optional(),
  url: z.string().optional(),
});

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
        "x-api-key": "Y9PcUcNe3JzHwBin5TTh1mVqkuc-VPTjIBgj",
        Accept: "application/json",
      },
    }
  );

  return SearchBandsResponseSchema.parse(await response.json());
};
