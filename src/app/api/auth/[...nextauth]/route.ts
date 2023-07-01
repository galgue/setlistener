import NextAuth from "next-auth";
import { authOptions } from "~/utils/auth";

type RequestType = (request: Request) => Promise<Response>;

const handler = NextAuth(authOptions) as RequestType;

export const GET = handler;
export const POST = handler;
