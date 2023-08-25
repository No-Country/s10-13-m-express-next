import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiTags('Users')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUsers(createUserDto);
      return { newUser, message: 'User created Successfully' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        // Si es una BadRequestException, devolvemos los detalles de validación
        throw error;
      } else if (error instanceof ConflictException) {
        // Si es una ConflictException, devolvemos el mensaje de conflicto
        throw error;
      } else {
        // Para cualquier otra excepción, devolvemos un mensaje genérico
        throw new BadRequestException('Something bad happened', {
          cause: error,
        });
      }
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
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error instanceof ConflictException) {
        throw error;
      } else {
        throw new BadRequestException('Something bad happened', {
          cause: error,
        });
      }
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
