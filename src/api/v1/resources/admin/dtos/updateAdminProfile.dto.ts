import {
  IsString,
  IsNotEmpty,
  IsDefined,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdateAdminProfileDto {
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
}
