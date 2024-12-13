import Redis from "ioredis";

class RedisClient {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisClient.instance) {
      RedisClient.instance = new Redis(); // Create a new Redis connection
    }
    return RedisClient.instance;
  }
}

export { RedisClient };
