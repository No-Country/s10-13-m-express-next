import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  // @ApiProperty({
  //   description: 'Review title',
  //   nullable: false,
  //   minLength: 4,
  //   example: 'Buena iniciativa',
  // })
  // @IsNotEmpty({ message: 'title is required' })
  // title: string;

  @ApiProperty({
    description: 'Review description',
    nullable: false,
    minLength: 5,
    example: 'La organizacion fue buena.',
  })
  @IsNotEmpty({ message: 'body is required' })
  body: string;

  // @ApiProperty({
  //   description: 'Review rating',
  //   nullable: false,
  //   example: 'Excelente',
  // })
  // @IsNotEmpty({ message: 'rating is required' })
  // rating: string;
  @ApiProperty({
    description: 'User Id',
    nullable: false,
    minLength: 24,
    maxLength: 24,
    example: '64e83e47891866a96b5977c1',
  })
  @IsNotEmpty({ message: 'userIDs is required' })
  userIDs: string;
  @ApiProperty({
    description: 'Initiative Id',
    nullable: false,
    minLength: 24,
    maxLength: 24,
    example: '64e83e47891866a96b5977c1',
  })
  @IsNotEmpty({ message: 'initiativeId is required' })
  initiativeId: string
}
