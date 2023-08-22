import { Initiative as ModelInitiative, Volunteers } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class InitiativeEntity implements ModelInitiative {
  id: string;

  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsNotEmpty({ message: 'Dead Line is required' })
  deadLine: Date;

  @IsNotEmpty({ message: 'Start Date is invalid' })
  startDate: Date;

  @IsNotEmpty({ message: 'endDate is required' })
  endDate: Date;

  galery: string;

  thumbnail: string;

  volunteers: Volunteers[];

  @IsNotEmpty({ message: 'ownerId is required' })
  ownerId: string;

  @IsNotEmpty({ message: 'categoryId is required' })
  categoryId: string;

  reviewsId: string[];

  postsId: string[];

  createdAt: Date;
  updatedAt: Date;

}
