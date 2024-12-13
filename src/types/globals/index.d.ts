import Redis from "ioredis";

declare global {
  let redis: Redis;
}

export {};