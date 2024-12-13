import { IsDefined, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AdminLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  emailOrPhoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MinLength(8)
  password: string;

  constructor() {
    this.emailOrPhoneNumber = "";
    this.password = "";
  }
}
