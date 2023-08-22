import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { UpdateInitiativeDto } from './dto/update-initiative.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Initiative } from '@prisma/client';
import { isMongoId, validate } from 'class-validator';


@Injectable()
export class InitiativesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createInitiativeDto: CreateInitiativeDto) {
    const errors = await validate(createInitiativeDto);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    const newInitiative = await this.prisma.initiative.create({
      data: createInitiativeDto,
    });
    return newInitiative;
  }

  async findAll(): Promise<Initiative[]> {
    return await this.prisma.initiative.findMany();
  }

  async findOne(id: string): Promise<Initiative | null> {

    if(!isMongoId(id)){
      throw new BadRequestException('You must provide a MongoId param.'); 
    }

    const result = await this.prisma.initiative.findUnique({
      where: { id: id },
    });

    if (!result) {
      throw new NotFoundException('Initiative not found');
    }

    return result;
  }

  async update(id: string, updateInitiativeDto: UpdateInitiativeDto): Promise<Initiative> {
    if(!isMongoId(id)){
      throw new BadRequestException('You must provide a MongoId param.'); 
    }
    const initiativeUpdated = await this.prisma.initiative.update({
      where: { id },
      data: updateInitiativeDto,
    });

    if (!initiativeUpdated) {
      throw new NotFoundException('Initiative not found');
    }

    return initiativeUpdated;
  }

  async remove(id: string): Promise<void> {
    if(!isMongoId(id)){
      throw new BadRequestException('You must provide a MongoId param.'); 
    }
    const deletedInitiative = await this.prisma.initiative.delete({
      where: { id },
    });
    //return `This action removes a #${id} initiative`;
  }
}
