import { Response } from "express";
import { AppError } from "../../../../shared/errors";

/**
 *
 * @param {AppError} err
 * @param {Response} res
 * @returns {}
 */

export const sendDevError = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
};
