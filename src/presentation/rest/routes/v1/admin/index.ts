import { Router } from "express";
const router = Router();

import { validator, protect, auth } from "../../../middlewares";

import {
  createFirstAccount,
  adminLogin,
  updateDefaultPassword,
  getAdmin,
  createAdmin,
  updateAdminRole,
  updateAdminAccountStatus,
  updateAdminProfile,
  updateEmailOrPhoneNumber,
  updatePassword,
  resetPassword,
  deleteAdmin,
  getAllAdmins,
  transferOwnership,
} from "./controller";

import {
  CreateFirstAccountDto,
  AdminLoginDto,
  UpdateDefaultPasswordDto,
  CreateAdminDto,
  UpdateAdminRoleDto,
  UpdateAdminAccountStatusDto,
  UpdateAdminProfileDto,
  UpdateEmailOrPhoneNumberDto,
  UpdatePasswordDto,
  ResetPasswordDto,
  TransferOwnershipDto,
} from "../../../../../api/v1/resources/admin/dtos";

import { Role } from "../../../../../shared";

router.post(
  "/firstaccount",
  validator(CreateFirstAccountDto),
  createFirstAccount
);

router.post("/login", validator(AdminLoginDto), adminLogin);

router
  .route("/")
  .post(
    protect,
    auth(Role.OWNER, Role.SUPERADMIN),
    validator(CreateAdminDto),
    createAdmin
  )
  .get(protect, auth(Role.OWNER, Role.SUPERADMIN, Role.ADMIN), getAllAdmins);

router.patch(
  "/transfer",
  protect,
  auth(Role.OWNER),
  validator(TransferOwnershipDto),
  transferOwnership
);

router.patch(
  "/reset",
  protect,
  auth(Role.OWNER, Role.SUPERADMIN),
  validator(ResetPasswordDto),
  resetPassword
);

router.patch(
  "/:id/defaultpassword",
  validator(UpdateDefaultPasswordDto),
  updateDefaultPassword
);

router.patch(
  "/:id/role",
  protect,
  auth(Role.OWNER, Role.SUPERADMIN),
  validator(UpdateAdminRoleDto),
  updateAdminRole
);

router.patch(
  "/:id/status",
  protect,
  auth(Role.OWNER, Role.SUPERADMIN),
  validator(UpdateAdminAccountStatusDto),
  updateAdminAccountStatus
);

router.patch(
  "/:id/contact",
  protect,
  auth(Role.OWNER, Role.SUPERADMIN, Role.ADMIN),
  validator(UpdateEmailOrPhoneNumberDto),
  updateEmailOrPhoneNumber
);

router.patch(
  "/:id/password",
  protect,
  auth(Role.OWNER, Role.SUPERADMIN, Role.ADMIN),
  validator(UpdatePasswordDto),
  updatePassword
);

router
  .route("/:id")
  .get(protect, auth(Role.OWNER, Role.SUPERADMIN, Role.ADMIN), getAdmin)
  .patch(
    protect,
    auth(Role.OWNER, Role.SUPERADMIN, Role.ADMIN),
    validator(UpdateAdminProfileDto),
    updateAdminProfile
  )
  .delete(protect, auth(Role.OWNER), deleteAdmin);

export default router;
