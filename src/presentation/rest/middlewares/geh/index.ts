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

  // Handle duplicate key errors
  if (err.message.includes("11000")) {
    const duplicateFields: { [key: string]: string } = {
      email: "Email already exists",
      phone_number: "Phone number already exists",
      title: "Title already exists",
      links: "Link URL already exists",
      name: "Name already exists",
    };

    Object.entries(duplicateFields).forEach(([key, message]) => {
      if (err.message.includes(key)) {
        err = new DuplicateError(message);
      }
    });
  }

  // Local, Dev, QA, or Production error
  if (configs.env === "local" || configs.env === "development") {
    sendDevError(err, res);
  } else if (configs.env === "qa" || configs.env === "production") {
    sendProd(err, res);
  } else {
    res.status(500).json({
      status: "ERROR",
      message: "An unknown error occurred.",
    });
  }
};
