import { IsDefined, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateDefaultPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  defaultPassword!: string;

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
