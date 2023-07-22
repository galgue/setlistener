import { z, ZodType } from "zod";
import { zodGet, zodSet } from "../typesafeRedis";

export const createStore = <SchemaType extends ZodType<unknown>>(
  storeName: string,
  schema: SchemaType
) => ({
  set(key: string | string[], value: z.infer<SchemaType>, exp?: number) {
    const keyString = Array.isArray(key) ? key.join(":") : key;
    return zodSet<SchemaType>(`${storeName}:${keyString}`, value, exp);
  },
  get(key: string | string[]) {
    const keyString = Array.isArray(key) ? key.join(":") : key;
    return zodGet(`${storeName}:${keyString}`, schema);
  },
});
