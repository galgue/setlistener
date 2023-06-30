import { z } from "zod";

export const ServerSchema = {
  NODE_ENV: z.enum(["development", "test", "production"]),
  PLAYLISTS_API_KEY: z.string(),
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string(),
};

export const ClientSchema = {
  // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
};

const EnvSchema = z.object({ ...ServerSchema, ...ClientSchema });

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof EnvSchema> {}
  }
}
