import { User as ModelUser, role } from '@prisma/client';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class UsersEntity implements ModelUser {
  id: string;
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  role: role;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  profileImage: string;
}
