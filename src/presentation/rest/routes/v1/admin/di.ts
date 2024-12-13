import { AdminService } from "../../../../../api/v1/resources/admin/admin.service";
import {
  AdminRepository,
  IAdminEntityMongoDB,
} from "../../../../../infrastructure/database/mongo/admin";

const adminRepo = new AdminRepository();
const adminService = new AdminService<IAdminEntityMongoDB>(adminRepo);

export { adminService };
