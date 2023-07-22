import type { ZodType, z } from "zod";
import { redisInstance } from "./redis";

export const zodGet = async <SchemaType extends ZodType<unknown>>(
  key: string,
  schema: SchemaType
) => {
  const cachedResult = await redisInstance.get(key);

  if (cachedResult) {
    try {
      return schema.parse(JSON.parse(cachedResult)) as z.infer<SchemaType>;
    } catch (e) {
      console.log(e);
    }
  }

  return null;
};

export const zodSet = async <SchemaType extends ZodType<unknown>>(
  key: string,
  value: z.infer<SchemaType>,
  exp?: number
) => {
  const stringValue = JSON.stringify(value);
  if (!exp) {
    await redisInstance.set(key, stringValue);
    return;
  }
  await redisInstance.set(key, stringValue, "EX", exp);
};
