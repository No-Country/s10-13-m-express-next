import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostsDto {
    @ApiProperty({
        description: 'User Id',
        nullable: false,
        minLength: 24,
        maxLength: 24,
        example: '64e83e47891866a96b5977c1',
    })
    @IsNotEmpty({ message: 'userId is required' })
    userId: string;

    @ApiProperty({
        description: 'Post description',
        nullable: false,
        minLength: 5,
        example: 'Me encanto participar en esta iniciativa.',
    })
    @IsNotEmpty({ message: 'description is required' })
    description: string;

    @ApiProperty({
        description: 'Url images',
        nullable: false,
        minLength: 8,
        example: 'https://hosting.com/image.jpg',
    })
    @IsNotEmpty({ message: 'galery is required' })
    galery: string;
}