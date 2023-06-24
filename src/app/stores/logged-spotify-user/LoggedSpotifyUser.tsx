import { cookies } from "next/headers";
import { SPOTIFY_TOKEN, SPOTIFY_TOKEN_TYPE } from "~/cookies/spotify.cookies";
import { apiCaller } from "~/server/api/root";
import { LoggedSpotifyUserAtom } from "./LoggedSpotifyUserAtom";

export const LoggedSpotifyUser = async () => {
  const spotifyAccessToken = cookies().get(SPOTIFY_TOKEN)?.value;
  const spotifyTokenType = cookies().get(SPOTIFY_TOKEN_TYPE)?.value;
  let user;

  if (spotifyAccessToken && spotifyTokenType) {
    user = await apiCaller.spotify.getUserProfile({
      accessToken: spotifyAccessToken,
      tokenType: spotifyTokenType,
    });
  }

  return <LoggedSpotifyUserAtom user={user} />;
};
