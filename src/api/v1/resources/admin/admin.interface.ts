export interface ICreateFirstAccountDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface IAdminLoginDto {
  emailOrPhoneNumber: string;
  password: string;
}

export interface IUpdateDefaultPasswordDto {
  defaultPassword: string;
  password: string;
  confirmPassword: string;
}

export interface ICreateAdminDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
}

export interface IUpdateAdminDto {
  role: string;
}

export interface IUpdateAdminProfileDto {
  firstName: string;
  lastName: string;
}

export interface IUpdateEmailOrPhoneDto {
  phoneNumber: string;
  email: string;
}

export interface IUpdateAdminAccountStatusDto {
  status: boolean;
}

export interface ITransferOwnershipDto {
  from: string;
  to: string;
  newRole: string;
}

export interface IDeleteMultipleAdminsDto {
  ids: string[];
}

export interface IUpdatePasswordDto {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface IResetPasswordDto {
  id: string;
}
