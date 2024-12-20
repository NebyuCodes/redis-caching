/**
 * @param {string} cacheKey
 */

import { RedisClient } from "../infrastructure/database";

export async function getCache<T>(cacheKey: string): Promise<T | null> {
  try {
    // Get redis connection
    const redis = RedisClient.getCacheInstance();

    // Get cached data
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData) as T;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

/**
 * @param {string} cacheKey
 * @param {T} cacheData
 * @param {number} ttl
 * @return {}
 */

export async function setCache<T>(
  cacheKey: string,
  cacheData: T,
  ttl: number
): Promise<void> {
  try {
    const redis = RedisClient.getCacheInstance();

    await redis.set(cacheKey, JSON.stringify(cacheData), "EX", ttl);
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {string} cacheKey
 * @returns {}
 */
export async function deleteCache(cacheKey: string): Promise<void> {
  try {
    const redis = RedisClient.getCacheInstance();

    await redis.del(cacheKey);
  } catch (error) {
    throw error;
  }
}
