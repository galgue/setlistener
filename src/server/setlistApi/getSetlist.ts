import { SetlistSchema } from "./Setlist.schemas";

export const getSetlist = async (id: string) => {
  let retries = 0;
  while (retries < 3) {
    const response = await fetch(
      `https://api.setlist.fm/rest/1.0/setlist/${id}`,
      {
        next: {
          revalidate: process.env.NODE_ENV === "production" ? 60 * 60 * 24 : 0,
        },
        headers: {
          "x-api-key": process.env.PLAYLISTS_API_KEY as string,
          Accept: "application/json",
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
