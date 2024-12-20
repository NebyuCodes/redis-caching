import { createServer } from "http";
import { app } from "./app";
import { bootstrapMongo } from "../../infrastructure";
import {
  RedisClient,
  bootstrapRedisSubscription,
} from "../../infrastructure/database";

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
    console.log("Redis Error.");
    console.error(error);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.warn(`Server is closing`);
    });

    mongoConnection
      .close()
      .then(() => {
        console.log("Mongo is closing");
      })
      .catch((error) => {
        console.log("Error while closing mongodb.");
        console.error(error);
      });

    RedisClient.getCacheInstance()
      .quit()
      .then(() => {
        console.log("Redis Cache is closing.");
      })
      .catch((error) => {
        console.log("Error while closing redis.");
        console.error(error);
      });

    RedisClient.getPublisherInstance()
      .quit()
      .then(() => {
        console.log("Redis Publisher is closing.");
      })
      .catch((error) => {
        console.log("Error while closing redis.");
        console.error(error);
      });

    RedisClient.getSubscriberInstance()
      .quit()
      .then(() => {
        console.log("Redis Subscriber is closing.");
      })
      .catch((error) => {
        console.log("Error while closing redis.");
        console.error(error);
      });
  });
};
