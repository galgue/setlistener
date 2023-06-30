import NextAuth from "next-auth";
import type { NextAuthHandlerParams } from "next-auth/core";
import { authOptions } from "~/lib/auth";

const handler = NextAuth(authOptions) as NextAuthHandlerParams;

export const GET = handler;
export const POST = handler;
