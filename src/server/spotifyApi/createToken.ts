import { SpotifyTokenSchema } from "./Spotify.schema";

export const refreshSpotifyToken = async () => {
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
};
