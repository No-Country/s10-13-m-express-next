import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { UpdateInitiativeDto } from './dto/update-initiative.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Initiative } from '@prisma/client';
import { isMongoId } from 'class-validator';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { buildQueryInitiative } from 'src/utils/initiativeFilter.utils';

@Injectable()
export class InitiativesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createInitiativeDto: CreateInitiativeDto) {
    try {
      const newInitiative = await this.prisma.initiative.create({
        data: createInitiativeDto,
      });
      return newInitiative;
    } catch (error) {
      this.errorHandler(error);
      console.log(error);
      /*throw new HttpException(
        "Data error: " + error.message,
        HttpStatus.BAD_REQUEST,
      );  */
    }
  }

  async findAll(
    country,
    province,
    name,
    categories,
    languages,
    themes,
    opportunities,
  ) {
    const query = buildQueryInitiative({
      country,
      province,
      name,
      categories,
      opportunities,
      languages,
      themes,
    });

    return await this.prisma.initiative.findMany({
      where: query,
      include: {
        owner: true,
      },
    });
  }

  async findOne(id: string): Promise<Initiative | null> {
    if (!isMongoId(id)) {
      throw new BadRequestException('You must provide a MongoId param.');
    }

    const result = await this.prisma.initiative.findUnique({
      where: { id: id },
      include: {
        owner: true,
      },
    });

    if (!result) {
      throw new NotFoundException(`Initiative ${id} not found`);
    }

    return result;
  }

  async update(
    id: string,
    updateInitiativeDto: UpdateInitiativeDto,
  ): Promise<Initiative> {
    if (!isMongoId(id)) {
      throw new BadRequestException('You must provide a MongoId param.');
    }
    const initiativeUpdated = await this.prisma.initiative.update({
      where: { id },
      data: updateInitiativeDto,
    });

    if (!initiativeUpdated) {
      throw new NotFoundException(`Initiative ${id} not found`);
    }

    return initiativeUpdated;
  }

  async remove(
    id: string,
  ): Promise<{ message: string; status: HttpStatus } | null> {
    try {
      if (!isMongoId(id)) {
        throw new BadRequestException('You must provide a MongoId param.');
      }
      const removed = await this.prisma.initiative.delete({ where: { id } });
      if (!removed) {
        throw new NotFoundException(`Initiative ${id} not found`);
      }
      return {
        message: `Initiative #${id} was successfully removed.`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        `Can't delete or not found ${id}.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  errorHandler(error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new HttpException(
        error.code + ' - ' + JSON.stringify(error.meta),
        HttpStatus.BAD_REQUEST,
      );
    } else {
      throw new HttpException(
        'Data error: ' + error.message + ' - ' + JSON.stringify(error.meta),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
