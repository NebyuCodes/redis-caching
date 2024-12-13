import { IsDefined, IsNotEmpty, IsString, IsEnum } from "class-validator";

enum Role {
  SUPERADMIN = "SuperAdmin",
  ADMIN = "Admin",
}

export class UpdateAdminRoleDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsEnum(Role, { message: "Role must be SuperAdmin or Admin" })
  role!: string;
}
