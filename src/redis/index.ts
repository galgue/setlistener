import { createRedisInstance } from "./redis";
import { zodGet, zodSet } from "./typesafeRedis";

const redisInstance = createRedisInstance();

export const redis = {
  ...redisInstance,
  zodGet: zodGet(redisInstance),
  zodSet: zodSet(redisInstance),
};
