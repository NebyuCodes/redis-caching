import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  id!: string;
}
