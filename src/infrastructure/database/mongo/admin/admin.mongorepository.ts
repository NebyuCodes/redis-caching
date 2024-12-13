import { IAdminRepository } from "../../../../api/v1/resources/admin/admin.repository";
import {
  ICreateAdminDto,
  ICreateFirstAccountDto,
  ITransferOwnershipDto,
  IUpdateAdminProfileDto,
  IUpdateEmailOrPhoneDto,
} from "../../../../api/v1/resources/admin/admin.interface";
import { AdminModel, IAdminEntityMongoDB } from "./admin.mongoentity";
import { NotFoundError } from "../../../../shared";

export class AdminRepository implements IAdminRepository<IAdminEntityMongoDB> {
  async createFirstAccount(
    data: ICreateFirstAccountDto
  ): Promise<IAdminEntityMongoDB> {
    try {
      const admin = await AdminModel.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        role: "Owner",
        firstAccount: true,
      });

      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getFirstAccount(): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findOne({
        firstAccount: true,
      });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdminByEmailOrPhoneNumber(
    emailOrPhoneNumber: string
  ): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findOne({
        $or: [
          { email: emailOrPhoneNumber },
          { phoneNumber: emailOrPhoneNumber },
        ],
      }).select(
        "firstName lastName email phoneNumber role password firstAccount isActive"
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdmin(id: string): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findById(id);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateDefaulPassword(
    id: string,
    password: string
  ): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { password, isDefaultPassword: false, isPasswordChanged: true },
        { runValidators: true, new: true }
      );

      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updatePasswordChanged(id: string): Promise<void> {
    try {
      await AdminModel.findByIdAndUpdate(
        id,
        { isPasswordChanged: false },
        { runValidators: true, new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async createAdmin(
    data: ICreateAdminDto & { password: string }
  ): Promise<IAdminEntityMongoDB> {
    try {
      const admin = await AdminModel.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        role: data.role,
        isDefaultPassword: true,
      });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateAdminRole(
    id: string,
    role: string
  ): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { role },
        { runValidators: true, new: true }
      );

      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateAdminAccountStatus(
    id: string,
    status: boolean
  ): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { isActive: status },
        { runValidators: true, new: true }
      );

      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateAdminProfile(
    id: string,
    data: IUpdateAdminProfileDto
  ): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { firstName: data.firstName, lastName: data.lastName },
        { runValidators: true, new: true }
      );

      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateEmailOrPhoneNumber(
    id: string,
    data: IUpdateEmailOrPhoneDto
  ): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        {
          email: data.email,
          phoneNumber: data.phoneNumber,
          isEmailOrPhoneNumberChanged: true,
        },
        { runValidators: true, new: true }
      );

      return admin;
    } catch (error) {
      throw error;
    }
  }

  async updateEmailOrPhoneNumberChanged(id: string): Promise<void> {
    try {
      await AdminModel.findById(
        id,
        { isEmailOrPhoneNumberChanged: false },
        { runValidators: true, new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(
    id: string,
    password: string
  ): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { password, isPasswordChanged: true },
        { runValidators: true, new: true }
      );

      return admin;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(
    id: string,
    password: string
  ): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { password, isDefaultPassword: true, isPasswordChanged: true },
        { runValidators: true, new: true }
      );

      return admin;
    } catch (error) {
      throw error;
    }
  }

  async deleteAdmin(id: string): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findByIdAndDelete(id);

      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAllAdmins(): Promise<{
    admins: IAdminEntityMongoDB[];
    totalResults: number;
  }> {
    try {
      const admins = await AdminModel.find({});
      const totalResults = await AdminModel.countDocuments();
      return { admins, totalResults };
    } catch (error) {
      throw error;
    }
  }

  async getOwner(): Promise<IAdminEntityMongoDB | null> {
    try {
      const admin = await AdminModel.findOne({ role: "Owner" });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async transferOwnership(
    data: ITransferOwnershipDto
  ): Promise<IAdminEntityMongoDB | null> {
    try {
      if (!(await this.getAdmin(data.to))) {
        throw new NotFoundError("The admin to be owner does not exists.");
      }
      const currentOwner = await AdminModel.findByIdAndUpdate(
        data.from,
        { role: data.newRole, firstAccount: false },
        { runValidators: true, new: true }
      );

      const newOwner = await AdminModel.findByIdAndUpdate(
        data.to,
        {
          role: "Owner",
          firstAccount: true,
        },
        { runValidators: true, new: true }
      );

      return newOwner;
    } catch (error) {
      throw error;
    }
  }
}
