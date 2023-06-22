import { SpotifyTokenSchema } from "./Spotify.schema";

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

  return {
    expiresIn: data.expires_in,
  };
};

const refreshSpotifyToken = async () => {
  while (true) {
    const { expiresIn } = await createSpotifyToken();
    await new Promise((resolve) =>
      setTimeout(resolve, expiresIn * 1000 - 1000 * 60 * 5)
    );
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
refreshSpotifyToken();
