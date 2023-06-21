import { z } from "zod";
import { SetlistSchema } from "./Setlist.schemas";

export const getSetlist = async (id: string) => {
  const response = await fetch(
    `https://api.setlist.fm/rest/1.0/setlist/${id}`,
    {
      headers: {
        "x-api-key": process.env.PLAYLISTS_API_KEY as string,
        Accept: "application/json",
      },
    }
  );
  const setlistResponse = SetlistSchema.parse(await response.json());
  return setlistResponse.sets;
};
