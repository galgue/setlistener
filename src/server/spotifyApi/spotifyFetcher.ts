import { getUserServerSession } from "~/utils/auth";
import { getSpotifyToken } from "./createToken";

export const spotifyFetcher = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) =>
  await fetch(input, {
    ...init,
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 60 * 60 * 24 : 0,
      ...init?.next,
    },
    headers: {
      Authorization: `Bearer ${await getSpotifyToken()}`,
      ...init?.headers,
    },
  });

export const currentUserSpotifyFetcher = async (
  input: RequestInfo | URL | ((sessionId: string) => RequestInfo | URL),
  init?: RequestInit | undefined
) => {
  const session = await getUserServerSession();

  if (!session?.user.accessToken || !session?.user.id) {
    throw new Error("No session found");
  }

  const url = typeof input === "function" ? input(session.user.id) : input;

  return await spotifyFetcher(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      ...init?.headers,
    },
  });
};
