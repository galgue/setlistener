"use client";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import type { SpotifyUser } from "~/server/spotifyApi/schemas";

const spotifyUserAtom = atom<SpotifyUser | undefined>(undefined);

type LoggedSpotifyUserAtomProps = {
  user?: SpotifyUser;
};

export const useLoggedSpotifyUser = () => {
  const [loggedUser, setLoggedUser] = useAtom(spotifyUserAtom);

  const refreshToken = (token: string) => {
    setLoggedUser((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        accessToken: token,
      };
    });
  };

  return {
    loggedUser,
    refreshToken,
    isLogged: !!loggedUser,
  };
};

export const LoggedSpotifyUserAtom = ({ user }: LoggedSpotifyUserAtomProps) => {
  useEffect(() => {
    spotifyUserAtom.onMount = (set) => {
      set(user);
    };
  }, [user]);

  return null;
};
