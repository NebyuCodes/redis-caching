import { RequestHandler } from "express";
import { AppError, NotFoundError, NoTokenError } from "../../../shared/errors";
import { verifyToken } from "../../../utils";
import { adminService } from "../routes/v1/admin/di";

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const protect: RequestHandler = async (req, res, next) => {
  try {
    // Get the Bearer JWT Token
    let token: string = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new NoTokenError());

    // Verify the Token
    const decodedData = verifyToken(token);

    if (decodedData.role === "admin") {
      // Check if there is an admin
      const admin = await adminService.getAdmin(decodedData.id);
      if (!admin) return next(new AppError("Admin does not exists", 400));

      // Check if the admin account is active
      if (!admin.isActive)
        return next(new AppError("Admin account is not active", 400));

      // Check if the admin is still using a default password
      if (admin.isDefaultPassword)
        return next(
          new AppError(
            "You are still using a default password. Please update the default password.",
            400
          )
        );

      // Check if the admin updates a password
      if (admin.isPasswordChanged)
        return next(
          new AppError(
            "You have recently changed a password. Please login again.",
            400
          )
        );

      // Check if the admin updates an email or phone number
      if (admin.isEmailOrPhoneNumberChanged)
        return next(
          new AppError(
            "You changed your email or phone number. Please login again.",
            400
          )
        );

      req.admin = admin;
    }

    next();
  } catch (error) {
    next(error);
  }
};
