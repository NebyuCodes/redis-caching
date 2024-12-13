import { IsDefined, IsEnum, IsNotEmpty, IsString } from "class-validator";

enum Role {
  SUPERADMIN = "SuperAdmin",
  ADMIN = "Admin",
}

export class TransferOwnershipDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  from!: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  to!: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsEnum(Role, { message: "Role must be SuperAdmin or Admin" })
  newRole!: string;
}
