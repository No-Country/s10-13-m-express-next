import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { UpdateInitiativeDto } from './dto/update-initiative.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { convertToArray } from 'src/utils/convertToArray.utils';

@ApiBearerAuth()
@ApiTags('Initiatives')
@Controller('initiatives')
export class InitiativesController {
  constructor(
    private readonly initiativesService: InitiativesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async create(
    @Body() createInitiativeDto: CreateInitiativeDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    try {
      console.log('createInitiativeDto prev', createInitiativeDto);
      const response = await this.cloudinaryService
        .uploadImage(thumbnail)
        .catch((error) => {
          throw new BadRequestException('Invalid file type.');
        });
        // Solución temporal
      createInitiativeDto.categories = convertToArray(
        createInitiativeDto.categories,
      );
      createInitiativeDto.languages = convertToArray(
        createInitiativeDto.languages,
      );
      createInitiativeDto.themes = convertToArray(createInitiativeDto.themes);
      createInitiativeDto.opportunities = convertToArray(
        createInitiativeDto.opportunities,
      );
      createInitiativeDto.thumbnail = response.secure_url;
      console.log('createInitiativeDto', createInitiativeDto);
      //return;
      return this.initiativesService.create(createInitiativeDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll() {
    return this.initiativesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.initiativesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInitiativeDto: UpdateInitiativeDto,
  ) {
    return this.initiativesService.update(id, updateInitiativeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.initiativesService.remove(id);
  }
}
