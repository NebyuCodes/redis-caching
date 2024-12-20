import { RedisClient } from "..";

/**
 * @param {string} channel
 * @param {string} message
 */

export const notifyAdmin = (channel: string, message: string) => {
  const redis = RedisClient.getPublisherInstance();
  redis.publish(channel, message);
};
