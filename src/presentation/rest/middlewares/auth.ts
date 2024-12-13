/**
 * @param {string[]}
 * @return {RequestHandler}
 */
import { RequestHandler } from "express";
import { NotAuthorizedError } from "../../../shared/errors";
import { IAdminEntityMongoDB } from "../../../infrastructure/database/mongo/admin";

export const auth = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    const user = <IAdminEntityMongoDB>req.admin;

    if (!roles.includes(user.role)) return next(new NotAuthorizedError());
    next();
  };
};
