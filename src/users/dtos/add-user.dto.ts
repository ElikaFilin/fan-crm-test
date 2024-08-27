import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('UA')
  phone: string;
}
