"use client";

import { type Token, useSpotifyConnect } from "~/hooks/useSpotifyConnect";

const SpotifyConnectPage = ({ searchParams }: { searchParams: Token }) => {
  const { redirectToLastPage, saveAuth } = useSpotifyConnect();

  saveAuth(searchParams);
  redirectToLastPage();

  return null;
};

export default SpotifyConnectPage;
