import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const TokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number().transform((value) => value.toString()),
  refresh_token: z.string(),
});

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    throw new Error("Missing code");
  }

  if (!process.env.SPOTIFY_CLIENT_ID) {
    throw new Error("Missing SPOTIFY_CLIENT_ID");
  }

  if (!process.env.SPOTIFY_CLIENT_SECRET) {
    throw new Error("Missing SPOTIFY_CLIENT_SECRET");
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      code: code,
      redirect_uri: "http://localhost:3000/api/spotify/callback",
      grant_type: "authorization_code",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch token");
  }

  const data = TokenSchema.parse(await res.json());

  const url = req.nextUrl.clone();

  url.pathname = "/spotify/connect";

  Object.entries(data).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return NextResponse.redirect(url.toString());
}
