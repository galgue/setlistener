import { SetlistSchema } from "./schemas";
import { setlistFetcher } from "./setlistFetcher";

export const getSetlist = async (id: string) => {
  let retries = 0;
  while (retries < 3) {
    const response = await setlistFetcher(
      `https://api.setlist.fm/rest/1.0/setlist/${id}`
    );
    const setlistResponse = SetlistSchema.safeParse(await response.json());

    if (setlistResponse.success) {
      return setlistResponse.data.sets;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    retries++;
  }

  throw new Error("Could not fetch setlist");
};
