import { IAdminRepository } from "./admin.repository";
import {
  ICreateAdminDto,
  ICreateFirstAccountDto,
  ITransferOwnershipDto,
  IUpdateAdminProfileDto,
  IUpdateEmailOrPhoneDto,
} from "./admin.interface";

export class AdminService<T> {
  constructor(private readonly adminRepository: IAdminRepository<T>) {}

  async createFirstAccount(data: ICreateFirstAccountDto): Promise<T> {
    try {
      const admin = await this.adminRepository.createFirstAccount(data);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getFirstAccount(): Promise<T | null> {
    try {
      const admin = await this.adminRepository.getFirstAccount();
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdminByEmailOrPhoneNumber(
    emailOrPhoneNumber: string
  ): Promise<T | null> {
    try {
      const admin = await this.adminRepository.getAdminByEmailOrPhoneNumber(
        emailOrPhoneNumber
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdmin(id: string): Promise<T | null> {
    try {
      const admin = await this.adminRepository.getAdmin(id);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateDefaultPassword(id: string, password: string): Promise<T | null> {
    try {
      const admin = await this.adminRepository.updateDefaulPassword(
        id,
        password
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updatePasswordChanged(id: string): Promise<void> {
    try {
      await this.adminRepository.updatePasswordChanged(id);
    } catch (error) {
      throw error;
    }
  }

  async createAdmin(data: ICreateAdminDto & { password: string }): Promise<T> {
    try {
      const admin = await this.adminRepository.createAdmin(data);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateAdminRole(id: string, role: string): Promise<T | null> {
    try {
      const admin = await this.adminRepository.updateAdminRole(id, role);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateAdminAccountStatus(
    id: string,
    status: boolean
  ): Promise<T | null> {
    try {
      const admin = await this.adminRepository.updateAdminAccountStatus(
        id,
        status
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateAdminProfile(
    id: string,
    data: IUpdateAdminProfileDto
  ): Promise<T | null> {
    try {
      const admin = await this.adminRepository.updateAdminProfile(id, data);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateEmailOrPhoneNumber(
    id: string,
    data: IUpdateEmailOrPhoneDto
  ): Promise<T | null> {
    try {
      const admin = await this.adminRepository.updateEmailOrPhoneNumber(
        id,
        data
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateEmailOrPhoneNumberChanged(id: string): Promise<void> {
    try {
      await this.adminRepository.updateEmailOrPhoneNumberChanged(id);
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(id: string, password: string): Promise<T | null> {
    try {
      const admin = await this.adminRepository.updatePassword(id, password);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(id: string, password: string): Promise<T | null> {
    try {
      const admin = await this.adminRepository.resetPassword(id, password);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async deleteAdmin(id: string): Promise<T | null> {
    try {
      const admin = await this.adminRepository.deleteAdmin(id);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAllAdmins(): Promise<{
    admins: T[];
    totalResults: number;
  }> {
    try {
      const { admins, totalResults } =
        await this.adminRepository.getAllAdmins();
      return { admins, totalResults };
    } catch (error) {
      throw error;
    }
  }

  async getOwner(): Promise<T | null> {
    try {
      const owner = await this.adminRepository.getOwner();
      return owner;
    } catch (error) {
      throw error;
    }
  }

  async transferOwnership(data: ITransferOwnershipDto): Promise<T | null> {
    try {
      const admin = await this.adminRepository.transferOwnership(data);
      return admin;
    } catch (error) {
      throw error;
    }
  }
}
