import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateFirstAccountDto {
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
  @MinLength(8)
  @IsStrongPassword()
  password!: string;
}
