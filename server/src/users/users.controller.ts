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
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { changePassword } from 'src/utils/changePassword.utils';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'bannerImage', maxCount: 1 },
      { name: 'profileImage', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles()
    files: {
      profileImage?: Express.Multer.File[];
      bannerImage?: Express.Multer.File[];
    },
  ) {
    try {
      for (const key in files) {
        if (files[key]) {
          const response = await this.cloudinaryService
            .uploadImage(files[key][0])
            .catch((error) => {
              console.log('cloudinaryService', error);
              throw new BadRequestException('Invalid file type.');
            });
          updateUserDto[key] = response.secure_url;
        }
      }

      const currentUser = await this.usersService.findOneById(userId);
      if (
        updateUserDto.newPassword &&
        updateUserDto.oldPassword &&
        updateUserDto.newPassword.length >= 0 &&
        updateUserDto.oldPassword.length >= 0
      ) {
        const newPass = await changePassword(
          updateUserDto.oldPassword,
          updateUserDto.newPassword,
          currentUser.password,
        );
        updateUserDto.password = newPass;
      }

      delete updateUserDto.oldPassword;
      delete updateUserDto.newPassword;
      if (updateUserDto.profileImage === '') delete updateUserDto.profileImage;
      if (updateUserDto.bannerImage === '') delete updateUserDto.bannerImage;
      const updatedUser = await this.usersService.updateUser(
        userId,
        updateUserDto,
      );
      return { user: updatedUser, message: 'User correctly updated' };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') userId: string) {
    try {
      await this.usersService.removeUser(userId);
      console.log('remove', userId);
      return 'User successfully deleted';
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  @Post('/testImageUpload')
  @UseInterceptors(FileInterceptor('profileImage'))
  async testImageUpload(
    @Body() body,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    console.log('file', profileImage);
    const response = await this.cloudinaryService
      .uploadImage(profileImage)
      .catch((error) => {
        console.log('cloudinaryService', error);
        throw new BadRequestException('Invalid file type.');
      });

    console.log('Final url', response.secure_url);
    return;
  }
}
