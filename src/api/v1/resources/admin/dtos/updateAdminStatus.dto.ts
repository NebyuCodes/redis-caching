import { IsBoolean, IsDefined, IsNotEmpty, IsString } from "class-validator";

export class UpdateAdminAccountStatusDto {
  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  status!: boolean;
}
