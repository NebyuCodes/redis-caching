import { Response } from "express";
import { AppError } from "../../../../shared/errors";

/**
 *
 * @param {AppError} err
 * @param {Response} res
 * @returns {}
 */
export const sendProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "ERROR",
      message: "Opps!! Unknown error. Please try again.",
    });
  }
};
