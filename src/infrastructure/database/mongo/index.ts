import { configs } from "../../../config";
import { connect, Connection, connection } from "mongoose";
import { logger } from "../../../utils";

/**
 *
 * @param {DataSource} dataSource
 * @returns {}
 */
export const bootstrapMongo = (): Connection => {
  connect(configs.db.dev)
    .then((response) => {
      logger.info(`MongoDB is successfully connected`);
    })
    .catch((error) => {
      logger.warn(`Unable to connect to DB`);
      logger.error(error.message);
      logger.info("DB is error might happen due to connection string issue.");
    });

  return connection;
};
