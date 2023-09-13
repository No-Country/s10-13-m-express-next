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
  Query,
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
      if (thumbnail) {
        const response = await this.cloudinaryService
          .uploadImage(thumbnail)
          .catch((error) => {
            throw new BadRequestException('Invalid file type.');
          });

        createInitiativeDto.thumbnail = response.secure_url;
      }

      createInitiativeDto.themes = convertToArray(createInitiativeDto.themes);
      createInitiativeDto.opportunities = convertToArray(
        createInitiativeDto.opportunities,
      );

      return this.initiativesService.create(createInitiativeDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll(
    @Query('country') country: string,
    @Query('province') province: string,
    @Query('name') name: string,
    @Query('themes') themes: string,
    @Query('opportunities') opportunities: string,
  ) {
    return this.initiativesService.findAll(
      country,
      province,
      name,
      themes,
      opportunities,
    );
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

  @Post(':id/join')
  joinInitiative(@Param('id') id: string, @Body() body) {
    try {
      return this.initiativesService.joinInitiative(id, body.userId);
    } catch (error) {
      console.log(error);
    }
  }
}
