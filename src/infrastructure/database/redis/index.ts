import Redis from "ioredis";
import { notifyAdmin, bootstrapRedisSubscription } from "./utils";

class RedisClient {
  private static cacheInstance: Redis;
  private static publisherInstance: Redis;
  private static subscriberInstance: Redis;

  private constructor() {}

  public static getCacheInstance(): Redis {
    if (!RedisClient.cacheInstance) {
      RedisClient.cacheInstance = new Redis(); // Create a new Redis connection
    }
    return RedisClient.cacheInstance;
  }

  public static getPublisherInstance(): Redis {
    if (!RedisClient.publisherInstance) {
      RedisClient.publisherInstance = new Redis();
    }
    return RedisClient.publisherInstance;
  }

  public static getSubscriberInstance(): Redis {
    if (!RedisClient.subscriberInstance) {
      RedisClient.subscriberInstance = new Redis();
    }
    return RedisClient.subscriberInstance;
  }
}

export { RedisClient, notifyAdmin, bootstrapRedisSubscription };
