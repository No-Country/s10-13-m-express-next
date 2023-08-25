import { ApiProperty } from '@nestjs/swagger';
import { Initiative as ModelInitiative, Volunteers } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class Initiative implements ModelInitiative {
  id: string;

  @ApiProperty({
    example: 'Pintura',
  })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    example: 'Pintura de palos',
  })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Dead Line is required' })
  deadLine: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Start Date is invalid' })
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'endDate is required' })
  endDate: Date;

  galery: string;

  thumbnail: string;

  volunteers: Volunteers[];

  @ApiProperty()
  @IsNotEmpty({ message: 'ownerId is required' })
  ownerId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'categoryId is required' })
  categoryId: string;

  reviewsId: string[];

  postsId: string[];

  createdAt: Date;
  updatedAt: Date;
}
