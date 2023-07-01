import { type AuthOptions, getServerSession } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  site: process.env.NEXTAUTH_URL,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user = { ...session.user, id: token.sub };
      return session;
    },
  },
};

export const getUserServerSession = () =>
  getServerSession(authOptions).then((session) => session || undefined);
