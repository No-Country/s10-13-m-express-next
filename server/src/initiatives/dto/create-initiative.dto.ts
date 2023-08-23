import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsISO8601, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInitiativeDto  {
  @ApiProperty({
    description: 'Initiative name',
    nullable: false,
    minLength: 5,
    example: 'Pintura',
  })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    description: 'Initiative description',
    nullable: false,
    minLength: 10,
    example: 'Pintura de palos',
  })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    description: 'Initiative Dead Line',
    nullable: false,
    minLength: 24,
    example: '2023-08-23T03:02:06.086Z',
  })
  @IsNotEmpty({ message: 'Dead Line is required' })
  @IsISO8601()
  deadLine: Date;

  @ApiProperty({
    description: 'Initiative start date',
    nullable: false,
    minLength: 24,
    example: '2023-08-23T03:02:06.086Z',
  })
  @IsNotEmpty({ message: 'startDate is required' })
  @IsISO8601()
  startDate: Date;

  @ApiProperty({
    description: 'Initiative end date',
    nullable: false,
    minLength: 24,
    example: '2023-08-23T03:02:06.086Z',
  })
  @IsNotEmpty({ message: 'endDate is required' })
  @IsISO8601()
  endDate: Date;

  @ApiProperty({
    description: 'Initiative galery',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  galery?: string;

  @ApiProperty({
    description: 'Initiative thumbnail',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({    
    description: 'Initiative ownerId (mongo _id format)',
    nullable: false, 
    example: '64e1bb0cb3ca40c582add154',
  })
  @IsNotEmpty({ message: 'ownerId is required' })
  @IsMongoId()
  ownerId: string;

  @ApiProperty({
    description: 'Initiative categoryId (mongo _id format)',
    nullable: false, 
    example: '64e1bb0cb3ca40c582add154',})
  @IsNotEmpty({ message: 'categoryId is required' })
  @IsMongoId()
  categoryId: string;
}