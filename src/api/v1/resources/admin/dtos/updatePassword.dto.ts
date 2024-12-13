import { IsDefined, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  currentPassword!: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MinLength(8)
  password!: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  confirmPassword!: string;
}
