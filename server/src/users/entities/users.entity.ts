import { User as ModelUser, role } from '@prisma/client';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class UsersEntity implements ModelUser {
  id: string;
  @IsNotEmpty({ message: 'name is required' })
  firstName: string;

  @IsNotEmpty({ message: 'lastName is required' })
  lastName: string;

  @IsNotEmpty({ message: 'phone is required' })
  phone: string;

  @IsNotEmpty({ message: 'email is invalid' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'role is required' })
  role: role;

  @IsNotEmpty({ message: 'password is required' })
  password: string;

  profileImage: string;
}
