import {
  IsISO8601,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name is required' })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'lastName is required' })
  lastName: string;

  @IsString()
  @IsOptional()
  @IsISO8601()
  birthday?: Date;

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

  @IsString()
  @IsOptional()
  bannerImage?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  @IsOptional()
  orgName?: string;
}
