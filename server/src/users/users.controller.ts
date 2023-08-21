import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUsers(createUserDto);
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: error,
      });
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') userId: string) {
    try {
      const user = await this.usersService.findOneById(userId);
      return { user, message: 'User successfully found' };
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.updateUser(
      userId,
      updateUserDto,
    );
    return { user: updatedUser, message: 'User correctly updated' };
  }

  @Delete(':id')
  async remove(@Param('id') userId: string) {
    await this.usersService.removeUser(userId);
    return 'User successfully deleted';
  }
}
