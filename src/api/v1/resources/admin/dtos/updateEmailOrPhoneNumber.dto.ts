import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class UpdateEmailOrPhoneNumberDto {
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
}
