import { IAdminEntity } from "../../../../api/v1/resources/admin/admin.entity";
import { Schema, Document, model } from "mongoose";

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      maxlength: [200, "First name can not exceed 200 characters"],
      minlength: [1, "First name can not be less than 1 character"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      maxlength: [200, "Last name can not exceed 200 characters"],
      minlength: [1, "Last name can not be less than 1 character"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ["Owner", "SuperAdmin", "Admin"],
        message: "Invalid or Unknown Role",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    firstAccount: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDefaultPassword: {
      type: Boolean,
      default: false,
    },
    isPasswordChanged: {
      type: Boolean,
      default: false,
    },
    isEmailOrPhoneNumberChanged: {
      type: Boolean,
      default: false,
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true,
  }
);

export interface IAdminEntityMongoDB extends IAdminEntity, Document {}

export const AdminModel = model<IAdminEntityMongoDB>("Admin", adminSchema);
