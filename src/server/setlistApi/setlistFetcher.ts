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

  return await fetch(input, {
    ...init,
    headers: {
      "x-api-key": process.env.PLAYLISTS_API_KEY,
      Accept: "application/json",
      ...init?.headers,
    },
  });
};
