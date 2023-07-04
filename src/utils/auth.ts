import { type AuthOptions, getServerSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import { z } from "zod";

const scope = [
  "user-read-email",
  "playlist-modify-private",
  "playlist-modify-public",
  "ugc-image-upload",
].join(" ");

const spotifyProvider = SpotifyProvider({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  authorization: {
    params: {
      scope,
    },
  },
});

const RefreshTokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string().optional(),
});

const refreshAccessToken = async (token: JWT) => {
  try {
    const tokenUrl = spotifyProvider.token?.toString();
    if (!tokenUrl) {
      throw new Error("No token url");
    }
    const url =
      `${tokenUrl}?` +
      new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }).toString();

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = RefreshTokenResponseSchema.parse(
      await response.json()
    );

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    } as JWT;
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  site: process.env.NEXTAUTH_URL,
  providers: [spotifyProvider],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_at || 3600) * 1000,
          refreshToken: account.refresh_token,
          user,
        } as JWT;
      }
      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpires < Date.now()) {
        return token;
      }

      // Access token has expired, try to update it
      return await refreshAccessToken(token);
    },
    session({ session, token }) {
      session.user = token.user;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
};

export const getUserServerSession = () =>
  getServerSession(authOptions).then((session) => session || undefined);
