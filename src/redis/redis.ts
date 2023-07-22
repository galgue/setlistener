import { Redis, type RedisOptions } from "ioredis";

function createRedisInstance() {
  try {
    const options: RedisOptions = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }

        return Math.min(times * 200, 1000);
      },
    };

    const redis = new Redis(options);

    redis.on("error", (error: unknown) => {
      console.warn("[Redis] Error connecting", error);
    });

    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}

export const redisInstance = createRedisInstance();
