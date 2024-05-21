import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { UserType } from '../enum/user-type';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  type: UserType;
}