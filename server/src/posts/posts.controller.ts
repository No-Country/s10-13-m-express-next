import { Controller, Get, Post, Body, Param, BadRequestException, ConflictException  } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-posts.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsServices: PostsService) {}

    @Post()
    async createPosts(@Body() createPostsDto: CreatePostsDto){
        try {
            const newPost = await this.postsServices.createPosts(createPostsDto);
            return { newPost, message: 'Post created Successfully' };
        } catch (error) {
            if (error instanceof BadRequestException) {
                // Si es una BadRequestException, devolvemos los detalles de validación
                throw error;
              } else if (error instanceof ConflictException) {
                // Si es una ConflictException, devolvemos el mensaje de conflicto
                throw error;
              } else {
                // Para cualquier otra excepción, devolvemos un mensaje genérico
                throw new BadRequestException('Something bad happened', {
                  cause: error,
                });
              }
        }
    }

    @Get(':id')
    async getPostsByUserid(@Param('id') userId: string) {
        try {
            const posts = await this.postsServices.getPostsByUserId(userId);
            return { posts, message: 'Posts successfully found' };
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof ConflictException) {
                throw error;
            } else {
                throw new BadRequestException('Something bad happened', {
                    cause: error,
                });
            }
        }
    }
}
