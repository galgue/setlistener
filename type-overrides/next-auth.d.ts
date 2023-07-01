import { DefaultSession, User } from "next-auth";

type WithId = {
  id?: string;
};

declare module "next-auth" {
  export interface Session {
    user: WithId & DefaultSession["user"];
  }
  export interface AuthOptions {
    site?: string;
  }
}
