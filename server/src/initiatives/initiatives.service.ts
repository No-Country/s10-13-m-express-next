import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { UpdateInitiativeDto } from './dto/update-initiative.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Initiative } from '@prisma/client';
import { isMongoId } from 'class-validator';


@Injectable()
export class InitiativesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createInitiativeDto: CreateInitiativeDto) {
    return 'This action adds a new initiative';
  }

  async findAll(): Promise<Initiative[]> {
    return await this.prisma.initiative.findMany();
  }

  async findOne(id: string): Promise<Initiative | null> {

    if(!isMongoId(id)){
      throw new BadRequestException('You must provide a MongoId param'); 
    }

    const result = await this.prisma.initiative.findUnique({
      where: { id: id },
    });

    if (!result) {
      throw new NotFoundException('Initiative not found');
    }

    return result;
  }

  update(id: number, updateInitiativeDto: UpdateInitiativeDto) {
    return `This action updates a #${id} initiative`;
  }

  remove(id: number) {
    return `This action removes a #${id} initiative`;
  }
}
