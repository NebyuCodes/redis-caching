import { RequestHandler } from "express";
import {
  IAdminLoginDto,
  ICreateAdminDto,
  ICreateFirstAccountDto,
  IResetPasswordDto,
  ITransferOwnershipDto,
  IUpdateAdminAccountStatusDto,
  IUpdateAdminDto,
  IUpdateAdminProfileDto,
  IUpdateDefaultPasswordDto,
  IUpdateEmailOrPhoneDto,
  IUpdatePasswordDto,
} from "../../../../../api/v1/resources/admin/admin.interface";
import {
  hashPassword,
  comparePassword,
  signToken,
  defaultPassword,
  getCache,
  setCache,
  deleteCache,
} from "../../../../../utils";
import { AppError, NotFoundError } from "../../../../../shared";
import { adminService } from "./di";
import { NoAdminFound } from "../../../../../shared/errors/noAdmin.error";
import { IAdminEntityMongoDB } from "../../../../../infrastructure/database/mongo/admin";
import { notifyAdmin } from "../../../../../infrastructure/database/redis";
import { NotAuthorizedError } from "../../../../../shared/errors";

// Create first account
export const createFirstAccount: RequestHandler = async (req, res, next) => {
  try {
    const data = <ICreateFirstAccountDto>req.body;

    // Check if there is first account
    const firstAccount = await adminService.getFirstAccount();
    if (firstAccount)
      return next(new AppError("First account already exists", 400));

    // Hash the password
    const hashedPassword = hashPassword(data.password);

    // Create an admin
    const admin = await adminService.createFirstAccount({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
    });

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message: "First admin account is successfully created.",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login
export const adminLogin: RequestHandler = async (req, res, next) => {
  try {
    const data = <IAdminLoginDto>req.body;

    // Get and Check the admin login credentials
    const admin = await adminService.getAdminByEmailOrPhoneNumber(
      data.emailOrPhoneNumber
    );

    if (!admin || !comparePassword(data.password, admin.password))
      return next(new AppError("Invalid login credential", 400));

    // Check if password changed is true
    if (admin.isPasswordChanged)
      await adminService.updatePasswordChanged(admin.id);

    // Check if the email or phone number changed is true
    if (admin.isEmailOrPhoneNumberChanged)
      await adminService.updateEmailOrPhoneNumberChanged(admin.id);

    // Generate token
    const token = signToken({ id: admin.id, role: "admin" });

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "You have successfully logged in.",
      data: {
        admin,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Update default password
export const updateDefaultPassword: RequestHandler = async (req, res, next) => {
  try {
    const data = <IUpdateDefaultPasswordDto>req.body;

    // Get the admin and check
    const adminData = await adminService.getAdmin(req.params.id);
    if (!adminData) return next(new NoAdminFound());

    // Check if password and confirm password are similar
    if (data.password !== data.confirmPassword)
      return next(
        new AppError("Password and Confirm Password should be similar", 400)
      );

    // Compare password
    if (!comparePassword(data.defaultPassword, adminData.password))
      return next(new AppError("Invalid default password", 400));

    // Hash the current password
    const hashedPassword = hashPassword(data.password);

    // Update
    const admin = await adminService.updateDefaultPassword(
      req.params.id,
      hashedPassword
    );
    if (!admin) return next(new NoAdminFound());

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message: "Default password is successfully updated.",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Create an admin
export const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const data = <ICreateAdminDto>req.body;
    
    // const adminData = await adminService.getAdminByEmailOrPhoneNumber(
    //   data.email
    // );

    // if (adminData)
    //   return next(new AppError("Admin already exists with this email.", 400));

    // Create an admin
    const admin = await adminService.createAdmin({
      ...data,
      password: defaultPassword(),
    });

    // Notify admin
    if (admin) {
      notifyAdmin("newAdminCreated", JSON.stringify(admin));
    }

    res.status(200).json({
      status: "SUCCESS",
      message: "Admin account is successfully created",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get an admin
export const getAdmin: RequestHandler = async (req, res, next) => {
  try {
    const cachedAdmin = await getCache<IAdminEntityMongoDB>(
      `admin_${req.params.id}`
    );
    if (cachedAdmin) {
      console.log("Getting Cache data - Cache hit");
      // await deleteCache(`admin_${req.params.id}`);
      res.status(200).json({
        status: "SUCCESS",
        data: {
          admin: cachedAdmin,
        },
      });
      return;
    }

    const admin = await adminService.getAdmin(req.params.id);
    if (!admin) return next(new NoAdminFound());

    console.log("Caching - Cache Miss");
    await setCache<IAdminEntityMongoDB>(`admin_${req.params.id}`, admin, 3600);

    res.status(200).json({
      status: "SUCCESS",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update admin role
export const updateAdminRole: RequestHandler = async (req, res, next) => {
  try {
    const data = <IUpdateAdminDto>req.body;

    // Check if the id is the id of the one making the request
    const adminReq = <IAdminEntityMongoDB>req.admin;

    if (adminReq.id === req.params.id) {
      return next(new AppError("You can not change your own role", 403));
    }

    // Check if the id is owner's id and it exists
    const adminData = await adminService.getAdmin(req.params.id);
    if (!adminData) return next(new NoAdminFound());

    if (adminData && adminData.role === "Owner")
      return next(
        new AppError("You can not change the role of the owner", 403)
      );

    // Update
    const admin = await adminService.updateAdminRole(req.params.id, data.role);
    if (!admin) return next(new NoAdminFound());

    res.status(200).json({
      status: "SUCCESS",
      message: "Admin account role is successfully changed.",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update admin account status
export const updateAdminAccountStatus: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = <IUpdateAdminAccountStatusDto>req.body;

    // Check if the id is the id of the one making the request
    const adminReq = <IAdminEntityMongoDB>req.admin;

    if (adminReq.id === req.params.id) {
      return next(new NotAuthorizedError("You can not change your own status"));
    }

    // Check if the id is owner's id and it exists
    const adminData = await adminService.getAdmin(req.params.id);
    if (!adminData) return next(new NoAdminFound());

    if (adminData && adminData.role === "Owner")
      return next(
        new AppError("You can not change the status of the owner", 403)
      );

    // Update
    const admin = await adminService.updateAdminAccountStatus(
      req.params.id,
      data.status
    );
    if (!admin) return next(new NoAdminFound());

    res.status(200).json({
      status: "SUCCESS",
      message: "Admin account status is successfully updated.",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update admin profile
export const updateAdminProfile: RequestHandler = async (req, res, next) => {
  try {
    const data = <IUpdateAdminProfileDto>req.body;

    // Check if the id is the id of the one making the request
    const adminReq = <IAdminEntityMongoDB>req.admin;

    if (adminReq.id !== req.params.id) {
      return next(
        new AppError("You can not change other admins' profile info.", 403)
      );
    }

    // Update
    const admin = await adminService.updateAdminProfile(req.params.id, data);
    if (!admin) return next(new NoAdminFound());

    res.status(200).json({
      status: "SUCCESS",
      message: "Profile info is successfully updated",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update email or phone number
export const updateEmailOrPhoneNumber: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = <IUpdateEmailOrPhoneDto>req.body;

    // Check if the id is the id of the one making the request
    const adminReq = <IAdminEntityMongoDB>req.admin;

    if (adminReq.id !== req.params.id) {
      return next(
        new AppError(
          "You can not change other admins' email or phone number.",
          403
        )
      );
    }

    if (
      adminReq.email === data.email &&
      adminReq.phoneNumber === data.phoneNumber
    )
      return next(
        new AppError(
          "Your email and phone number are similar to the existing contact address.",
          400
        )
      );

    // Update
    const admin = await adminService.updateEmailOrPhoneNumber(
      req.params.id,
      data
    );
    if (!admin) return next(new NoAdminFound());

    res.status(200).json({
      status: "SUCCESS",
      message: "Contact info is successfully updated.",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update password
export const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    const data = <IUpdatePasswordDto>req.body;

    // Check if the id is the id of the one making the request
    const adminReq = <IAdminEntityMongoDB>req.admin;

    if (adminReq.id !== req.params.id) {
      return next(
        new AppError("You can not change other admins' password.", 403)
      );
    }

    // Compare the current password
    const adminData = await adminService.getAdmin(req.params.id);
    if (!adminData) return next(new NoAdminFound());

    if (!comparePassword(data.password, adminData.password))
      return next(new AppError("Invalid current password.", 400));

    // Check if password and password confirm are the same
    if (data.password !== data.confirmPassword)
      return next(
        new AppError("Password and Confirm Password should be similar", 400)
      );

    // Hash password
    const hashedPassword = hashPassword(data.password);

    // Update
    const admin = await adminService.updatePassword(
      req.params.id,
      hashedPassword
    );
    if (!admin) return next(new NoAdminFound());

    res.status(200).json({
      status: "SUCCESS",
      message: "You have successfully changed your password.",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Reset Password
export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const data = <IResetPasswordDto>req.body;

    // Check if the id is the id of the one making the request
    const adminReq = <IAdminEntityMongoDB>req.admin;

    if (adminReq.id === data.id) {
      return next(new AppError("You can not reset your own password.", 403));
    }

    // Update
    const admin = await adminService.resetPassword(data.id, defaultPassword());
    if (!admin) return next(new NoAdminFound());

    res.status(200).json({
      status: "SUCCESS",
      message: "Password is successfully resetted.",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete admin
export const deleteAdmin: RequestHandler = async (req, res, next) => {
  try {
    // Check if the id is the id of the one making the request
    const adminReq = <IAdminEntityMongoDB>req.admin;

    if (adminReq.id === req.params.id) {
      return next(new AppError("You can not delete your own account.", 403));
    }

    const adminData = await adminService.getAdmin(req.params.id);
    if (!adminData) return next(new NoAdminFound());

    if (adminData && adminData.role === "Owner")
      return next(new AppError("You can not delete the owner", 403));

    const admin = await adminService.deleteAdmin(req.params.id);
    if (!admin) return next(new NoAdminFound());

    await deleteCache(`admin_${req.params.id}`);

    notifyAdmin("deleteAdmin", "I am deleteing an email.");

    res.status(200).json({
      status: "SUCCESS",
      message: "Admin account is successfully deleted.",
    });
  } catch (error) {
    next(error);
  }
};

// Get All Admins
export const getAllAdmins: RequestHandler = async (req, res, next) => {
  try {
    const { admins, totalResults } = await adminService.getAllAdmins();

    res.status(200).json({
      status: "SUCCESS",
      results: admins.length,
      totalResults,
      data: {
        admins,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Transfer Ownership
export const transferOwnership: RequestHandler = async (req, res, next) => {
  try {
    const data = <ITransferOwnershipDto>req.body;

    // Get Owner
    const owner = await adminService.getOwner();
    if (!owner)
      return next(new NotFoundError("There is no owner in the system."));

    // Check current owner
    if (data.from !== owner.id)
      return next(new NotFoundError("Owner does not exists."));

    // Check new owner
    const admin = await adminService.getAdmin(data.to);
    if (!admin)
      return next(new NotFoundError("The admin to be owner does not exists."));

    // Transfer
    const newOwner = await adminService.transferOwnership(data);
    if (!newOwner)
      return next(
        new AppError(
          "Unable to perform ownership transfer. Please try again.",
          400
        )
      );

    res.status(200).json({
      status: "SUCCESS",
      message: "Ownership is successfully transferred.",
      data: {
        owner: newOwner,
      },
    });
  } catch (error) {
    next(error);
  }
};
