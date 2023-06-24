"use client";

import { useLoggedSpotifyUser } from "~/app/stores";
import { useSpotifyConnect } from "~/hooks/useSpotifyConnect";

export const LoginButton = () => {
  const { connectToSpotify } = useSpotifyConnect();
  const { isLogged } = useLoggedSpotifyUser();

  return (
    <button
      type="button"
      className=" h-5/6 w-full rounded-lg bg-spotify-green py-1 text-2xl font-medium text-white hover:bg-green-800"
      onClick={() => {
        connectToSpotify();
      }}
    >
      {isLogged ? "Connected" : "Connect to Spotify"}
    </button>
  );
};
