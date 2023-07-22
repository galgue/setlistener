import { z, ZodType } from "zod";
import { zodGet, zodSet } from "../typesafeRedis";

export const createStore = <SchemaType extends ZodType<unknown>>(
  storeName: string,
  schema: SchemaType
) => ({
  set(key: string, value: z.infer<SchemaType>, exp?: number) {
    return zodSet<SchemaType>(`${storeName}:${key}`, value, exp);
  },
  get(key: string) {
    return zodGet(`${storeName}:${key}`, schema);
  },
});
