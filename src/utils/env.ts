import { z } from "zod";

const EnvSchema = z.object({
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string(),
});

const env = EnvSchema.parse(process.env);

export default env;
