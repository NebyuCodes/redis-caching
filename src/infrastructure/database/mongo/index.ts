import { configs } from "../../../config";
import { connect, Connection, connection } from "mongoose";

/**
 *
 * @param {DataSource} dataSource
 * @returns {}
 */
export const bootstrapMongo = (): Connection => {
  connect(configs.db.dev)
    .then((response) => {
      console.info(`MongoDB is successfully connected`);
    })
    .catch((error) => {
      console.error(`Unable to connect to DB`);
      console.log(error);
    });

  return connection;
};
