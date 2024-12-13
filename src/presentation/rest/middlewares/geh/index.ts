import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../../shared/errors";
import { configs } from "../../../../config";
import { sendDevError } from "./send-dev.error";
import { sendProd } from "./send-prod.error";
import { DuplicateError } from "../../../../shared/errors/duplicateError";

export const geh = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.status = err.status || "ERROR";
  err.statusCode = err.statusCode || 500;

  if (err.message.includes("11000")) {
    if (err.message.includes("email")) {
      err = new DuplicateError("Email already exists");
    } else if (err.message.includes("phone_number")) {
      err = new DuplicateError("Phone number already exists");
    } else if (err.message.includes("title")) {
      err = new DuplicateError("Title already exists");
    } else if (err.message.includes("links")) {
      err = new DuplicateError("Link URL already exists");
    } else if (err.message.includes("name")) {
      err = new DuplicateError("Name already exists");
    }
  }

  // Local, Dev, QA, or Production error
  if (configs.env === "local" || configs.env === "development") {
    sendDevError(err, res);
  } else if (configs.env === "qa" || configs.env === "production") {
    sendProd(err, res);
  }
};
