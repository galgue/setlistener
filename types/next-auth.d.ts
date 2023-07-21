import type { DefaultSession, User, Session } from "next-auth";

type WithId = {
  id?: string;
};

declare module "next-auth" {
  export interface Session {
    user: {
      id?: string;
      accessToken?: string;
    } & DefaultSession["user"];
    JWT?: string;
  }
  export interface AuthOptions {
    site?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessTokenExpires: number;
    refreshToken: string;
    user: Session["user"];
    accessToken: string;
  }
}
