"use client";

import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { z } from "zod";
import {
  SPOTIFY_EXPIRES_AT,
  SPOTIFY_REFRESH_TOKEN,
  SPOTIFY_TOKEN,
  SPOTIFY_TOKEN_TYPE,
} from "~/cookies/spotify.cookies";
import { redirectFetch } from "~/utils/redirectFetch";

const RETURN_TO_PAGE_KEY = "spotify.returnToPage";

export const TokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number().transform((value) => value.toString()),
  refresh_token: z.string(),
});

export type Token = z.infer<typeof TokenSchema>;

const saveAuth = (token: Token) => {
  setCookie(SPOTIFY_TOKEN, token.access_token);
  setCookie(SPOTIFY_REFRESH_TOKEN, token.refresh_token);
  setCookie(SPOTIFY_TOKEN_TYPE, token.token_type);
  setCookie(SPOTIFY_EXPIRES_AT, token.expires_in);
};

const connectToSpotifyWithReturnPage = (pageToReturn?: string) => {
  const redirectUri = encodeURIComponent(
    `${window.location.origin}/api/spotify/callback`
  );

  if (pageToReturn) {
    localStorage.setItem(RETURN_TO_PAGE_KEY, pageToReturn);
  }

  void redirectFetch("/api/spotify/login?redirectUrl=" + redirectUri);
};

const getSpotifyReturnToPage = () => {
  const page = localStorage.getItem(RETURN_TO_PAGE_KEY);

  localStorage.removeItem(RETURN_TO_PAGE_KEY);

  return page;
};

export const useSpotifyConnect = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectToLastPage = useCallback(() => {
    const page = getSpotifyReturnToPage();

    if (page) {
      router.push(page);
    }
  }, [router]);

  const connectToSpotify = useCallback(
    () =>
      connectToSpotifyWithReturnPage(`
    ${path}?${searchParams.toString()}
  `),
    [path, searchParams]
  );

  const isConnected = useMemo(() => {
    return hasCookie(SPOTIFY_TOKEN);
  }, []);

  const refreshAuth = useCallback(async () => {
    if (!hasCookie(SPOTIFY_REFRESH_TOKEN)) {
      throw new Error("Missing refresh token");
    }
    const refreshToken = getCookie(SPOTIFY_REFRESH_TOKEN);
    if (!refreshToken) {
      throw new Error("Missing refresh token");
    }
    const response = await fetch(
      `/api/spotify/refresh-token?refreshToken=${refreshToken.toString()}`
    );

    if (response.status === 200) {
      const token = TokenSchema.parse(await response.json());
      saveAuth(token);
    } else {
      deleteCookie(SPOTIFY_TOKEN);
    }
  }, [saveAuth]);

  return {
    connectToSpotify,
    redirectToLastPage,
    isConnected,
    refreshAuth,
    saveAuth,
  };
};
