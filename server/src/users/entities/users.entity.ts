import { User as ModelUser, role } from '@prisma/client';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsersEntity implements ModelUser {
  id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'name is required' })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'lastName is required' })
  lastName: string;

  birthday: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'phone is required' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'email is invalid' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'role is required' })
  role: role;

  @ApiProperty()
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  bannerImage: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  profileImage: string;
  orgName: string;
}
