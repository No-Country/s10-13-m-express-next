import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { UpdateInitiativeDto } from './dto/update-initiative.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Initiative } from '@prisma/client';
import { isMongoId, validate } from 'class-validator';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable()
export class InitiativesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createInitiativeDto: CreateInitiativeDto) {
    try {
      const errors = await validate(createInitiativeDto);

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

      const newInitiative = await this.prisma.initiative.create({
        data: createInitiativeDto,
      });
      return newInitiative;
    } catch (error) {
      this.errorHandler(error)
      /*throw new HttpException(
        "Data error: " + error.message,
        HttpStatus.BAD_REQUEST,
      );  */
    }
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
      throw new NotFoundException(`Initiative ${id} not found`);
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
      throw new NotFoundException(`Initiative ${id} not found`);
    }

    return initiativeUpdated;
  }

  async remove(id: string): Promise<Initiative | null> {

    try {
      if(!isMongoId(id)){
        throw new BadRequestException('You must provide a MongoId param.'); 
      }    
      const removed = await this.prisma.initiative.delete({ where: { id } })
      if (!removed) {
        throw new NotFoundException(`Initiative ${id} not found`);
      }
      return removed;
    } catch (error) {
      throw new HttpException(
        `Can't delete or not found ${id}.`,
        HttpStatus.BAD_REQUEST,
      );
    }

  }

  errorHandler(error){
    if (error instanceof PrismaClientKnownRequestError) {
      throw new HttpException(
        error.code+" - "+JSON.stringify(error.meta),
        HttpStatus.BAD_REQUEST,
      );      
    }else{
      throw new HttpException(
        "Data error: " + error.message + " - "+JSON.stringify(error.meta),
        HttpStatus.BAD_REQUEST,
      );  
    }
  }
  
}
