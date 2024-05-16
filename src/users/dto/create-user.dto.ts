import { IsString } from 'class-validator';
import { UserType } from '../enum/user-type';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()

  password: string;

  @IsString()
  type: UserType;
}