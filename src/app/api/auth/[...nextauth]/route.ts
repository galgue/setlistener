import NextAuth from "next-auth";
import { authOptions } from "~/lib/auth";

type GetType = (request: Request) => Promise<Response>;

const handler = NextAuth(authOptions) as GetType;

export const GET = handler;
export const POST = handler;
