import { SetlistSchema } from "./Setlist.schemas";
import { setlistFetcher } from "./setlistFetcher";

export const getSetlist = async (id: string) => {
  let retries = 0;
  while (retries < 3) {
    const response = await setlistFetcher(
      `https://api.setlist.fm/rest/1.0/setlist/${id}`,
      {
        next: {
          revalidate: process.env.NODE_ENV === "production" ? 60 * 60 * 24 : 0,
        },
      }
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
