import { z } from "zod";
import { ServerSchema, ClientSchema } from "../src/env.mjs";

const EnvSchema = z.object({ ...ServerSchema, ...ClientSchema });

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof EnvSchema> {}
  }
}
