import { SpotifyUserSchema } from "./schemas";

export const getUserProfile = async (
  tokenType: string,
  accessToken: string
) => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `${tokenType} ${accessToken}`,
    },
  });

  if (!response.ok) {
    return undefined;
  }

  const data = SpotifyUserSchema.parse(await response.json());

  return data;
};
