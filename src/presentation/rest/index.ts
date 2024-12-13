import { createServer } from "http";
import { app } from "./app";
import { bootstrapMongo } from "../../infrastructure";
import { RedisClient } from "../../infrastructure/database";

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

  RedisClient.getInstance().on("error", (error) => {
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

    RedisClient.getInstance()
      .quit()
      .then(() => {
        console.log("Redis is closing.");
      })
      .catch((error) => {
        console.log("Error while closing redis.");
        console.error(error);
      });
  });
};
