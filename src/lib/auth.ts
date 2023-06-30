import { getServerSession } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
};

export const getUserServerSession = () =>
  getServerSession(authOptions).then((session) => session || undefined);
