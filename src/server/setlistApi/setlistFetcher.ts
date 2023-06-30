import { RateLimiter } from "limiter";

const limiter = new RateLimiter({
  tokensPerInterval: 2,
  interval: 1200,
  fireImmediately: false,
});

export const setlistFetcher = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  await limiter.removeTokens(1);

  const fetchResponse = await fetch(input, {
    ...init,
    headers: {
      "x-api-key": process.env.PLAYLISTS_API_KEY,
      Accept: "application/json",
      ...init?.headers,
    },
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 0 : 60 * 60 * 24,
      ...init?.next,
    },
  });

  return fetchResponse;
};
