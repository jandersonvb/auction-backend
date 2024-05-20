import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserType } from '../enum/user-type';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()

  password: string;

  @IsString()
  type: UserType;
}