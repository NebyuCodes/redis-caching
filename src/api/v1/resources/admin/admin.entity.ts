export interface IAdminEntity {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
  firstAccount: boolean;
  isActive: boolean;
  isDefaultPassword: boolean;
  isPasswordChanged: boolean;
  isEmailOrPhoneNumberChanged: boolean;
  createdAt: Date;
  updatedAt: Date;
}
