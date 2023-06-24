import { NextResponse, type NextRequest } from "next/server";
import type { RedirectFetchResponse } from "~/utils/redirectFetch";

export function GET(req: NextRequest) {
  const redirectUrl = req.nextUrl.searchParams.get("redirectUrl");

  if (!redirectUrl) {
    throw new Error("Missing redirect url");
  }

  const redirect: RedirectFetchResponse = {
    redirectUrl: "https://accounts.spotify.com/authorize",
    searchParams: {
      client_id: process.env.SPOTIFY_CLIENT_ID as string,
      response_type: "code",
      redirect_uri: redirectUrl,
    },
  };

  return NextResponse.json(redirect);
}
