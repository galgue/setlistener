import { SpotifyTokenSchema } from "./schemas";

const createSpotifyToken = async () => {
  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("client_id", process.env.SPOTIFY_CLIENT_ID as string);
  body.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET as string);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    next: {
      revalidate: 0,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = SpotifyTokenSchema.parse(await response.json());

  process.env.SPOTIFY_TOKEN = data.access_token;
  process.env.SPOTIFY_TOKEN_EXPIRES = (
    Date.now() +
    data.expires_in * 1000 -
    1000 * 60 * 5
  ).toString();
  console.info("Spotify token refreshed", new Date().toISOString());

  return data.access_token;
};

export const getSpotifyToken = async () => {
  if (!process.env.SPOTIFY_TOKEN || !process.env.SPOTIFY_TOKEN_EXPIRES) {
    return await createSpotifyToken();
  }

  const isExpired = Date.now() > Number(process.env.SPOTIFY_TOKEN_EXPIRES);

  if (isExpired) {
    return await createSpotifyToken();
  }

  return process.env.SPOTIFY_TOKEN;
};
