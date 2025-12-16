import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(30)
  password: string;
}

