import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { RequestHandler } from "express";
import { CustomValidationError } from "../../../shared/errors";

/**
 * @param {T} DtoClass
 * @returns {}
 */

export function validator<T extends object>(
  DtoClass: new () => T
): RequestHandler {
  return async (req, res, next) => {
    const instance = plainToInstance(DtoClass, req.body);
    const errors = await validate(instance);

    if (errors.length > 0)
      return next(
        new CustomValidationError(
          errors
            .map((error) => Object.values(error.constraints as object).join(""))
            .join(",\n")
        )
      );

    next();
  };
}
