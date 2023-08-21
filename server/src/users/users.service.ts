import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { validate } from 'class-validator';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUsers(createUserDto: CreateUserDto): Promise<User> {
    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });
    return newUser;
  }

  async findAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOneById(userId: string): Promise<User | null> {
    if (!userId) {
      throw new NotFoundException('User ID entered is incorrect');
    }
    const result = this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result;
  }

  async updateUser(id: string, updateUserDto: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }
  async removeUser(id: string): Promise<void> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
  }
}
