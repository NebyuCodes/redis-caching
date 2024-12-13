import {
  IsString,
  IsNotEmpty,
  IsDefined,
  MaxLength,
  MinLength,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
} from "class-validator";

enum Role {
  SUPERADMIN = "SuperAdmin",
  ADMIN = "Admin",
}

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(100)
  @MinLength(2)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(100)
  @MinLength(2)
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsPhoneNumber()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsEnum(Role, { message: "Role must be SuperAdmin or Admin" })
  role!: Role;
}
