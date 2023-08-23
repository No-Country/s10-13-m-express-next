import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { validate } from 'class-validator';
import { Posts} from '@prisma/client';

@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService) {}

    async createPosts(createPostsDto: CreatePostsDto): Promise<Posts>{
        const errors = await validate(createPostsDto);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        const existingUser = await this.prisma.user.findUnique({
            where: {id: createPostsDto.userId}
        })

        if (!existingUser){
            throw new ConflictException('User ID no found');
        }
        const newPost = await this.prisma.posts.create({
            data: createPostsDto
        })
        return newPost
    }

    async getPostsByUserId(){
        return 'Posts por id user'
    }
}
