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

  @ApiProperty()
  galery: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  volunteers: Volunteers[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Categories are required' })
  categories: string[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Opportunities are required' })
  opportunities: string[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Locations are required' })
  locations: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Languages are required' })
  languages: string[];

  @ApiProperty()
  reviewsId: string[];

  @ApiProperty()
  postsId: string[];

  @ApiProperty()
  ownerId: string;

  createdAt: Date;
  updatedAt: Date;
}
