import { createServer } from "http";
import { app } from "./app";
import { bootstrapMongo } from "../../infrastructure";
import {
  RedisClient,
  bootstrapRedisSubscription,
} from "../../infrastructure/database";
import { logger } from "../../utils";

/**
 * @param {}
 * @returns {}
 */
export const bootstrapRest = () => {
  const port = (process.env.PORT as unknown as number) || 3000;

  const server = createServer(app);

  server.listen(port, () => {
    console.info(`Listening on ${port}...`);
  });

  const mongoConnection = bootstrapMongo();

  bootstrapRedisSubscription();

  RedisClient.getCacheInstance().on("error", (error) => {
    logger.info("Redis Error.");
    logger.error(error);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      logger.warn(`Server is closing`);
    });

    mongoConnection
      .close()
      .then(() => {
        logger.info("Mongo is closing");
      })
      .catch((error) => {
        logger.info("Error while closing mongodb.");
        logger.error(error);
      });

    RedisClient.getCacheInstance()
      .quit()
      .then(() => {
        logger.info("Redis Cache is closing.");
      })
      .catch((error) => {
        logger.info("Error while closing redis.");
        logger.error(error);
      });

    RedisClient.getPublisherInstance()
      .quit()
      .then(() => {
        logger.info("Redis Publisher is closing.");
      })
      .catch((error) => {
        logger.info("Error while closing redis.");
        logger.error(error);
      });

    RedisClient.getSubscriberInstance()
      .quit()
      .then(() => {
        logger.info("Redis Subscriber is closing.");
      })
      .catch((error) => {
        logger.info("Error while closing redis.");
        logger.error(error);
      });

    process.exit(0);
  });
};
