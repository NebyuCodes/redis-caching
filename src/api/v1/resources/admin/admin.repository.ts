import {
  ICreateAdminDto,
  ICreateFirstAccountDto,
  ITransferOwnershipDto,
  IUpdateAdminProfileDto,
  IUpdateEmailOrPhoneDto,
} from "./admin.interface";

export interface IAdminRepository<T> {
  createFirstAccount(data: ICreateFirstAccountDto): Promise<T>;
  getFirstAccount(): Promise<T | null>;
  getAdminByEmailOrPhoneNumber(emailOrPhoneNumber: string): Promise<T | null>;
  getAdmin(id: string): Promise<T | null>;
  updateDefaulPassword(id: string, password: string): Promise<T | null>;
  updatePasswordChanged(id: string): Promise<void>;
  createAdmin(data: ICreateAdminDto & { password: string }): Promise<T>;
  updateAdminRole(id: string, role: string): Promise<T | null>;
  updateAdminAccountStatus(id: string, status: boolean): Promise<T | null>;
  updateAdminProfile(
    id: string,
    data: IUpdateAdminProfileDto
  ): Promise<T | null>;
  updateEmailOrPhoneNumber(
    id: string,
    data: IUpdateEmailOrPhoneDto
  ): Promise<T | null>;
  updateEmailOrPhoneNumberChanged(id: string): Promise<void>;
  updatePassword(id: string, password: string): Promise<T | null>;
  resetPassword(id: string, password: string): Promise<T | null>;
  deleteAdmin(id: string): Promise<T | null>;
  getAllAdmins(): Promise<{ admins: T[]; totalResults: number }>;
  getOwner(): Promise<T | null>;
  transferOwnership(data: ITransferOwnershipDto): Promise<T | null>;
}
