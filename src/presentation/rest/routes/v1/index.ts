import { Application } from "express";
import admin from "./admin";
/**
 * @param {}
 * @returns {}
 */

export const v1 = (app: Application) => {
  app.use("/api/v1/admin", admin);
};
