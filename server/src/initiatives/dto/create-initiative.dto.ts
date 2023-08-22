import { OmitType } from '@nestjs/mapped-types';
import { InitiativeEntity } from '../entities/initiative.entity';

export class CreateInitiativeDto extends OmitType(InitiativeEntity, ['id', 'volunteers', 'reviewsId', 'galery', 'thumbnail','postsId', 'createdAt', 'updatedAt']) {}