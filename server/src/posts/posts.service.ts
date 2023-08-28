import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-initiative.dto';
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

    async getPostsByUserId(userId: string): Promise<Posts[]> {
        try {
            const userPosts = await this.prisma.posts.findMany({
                where: { userId: userId }
            });
            if (userPosts.length === 0) {
                throw new ConflictException('User ID not found');
            } else {
                return userPosts;
            }
        } catch (error) {
            throw error;
        }
    }

    async deletePostByPostId(postId: string): Promise<Posts>{
        try {
            const deletePost = await this.prisma.posts.delete({
                where: { id : postId}
            })
            if(!deletePost){
                throw new NotFoundException(`Post ${postId} not found`)
            }
            return deletePost
        } catch (error) {
            throw error;
        }
    }

    async updatePostByPostId(postId: string, updatePostDto: UpdatePostDto): Promise<Posts>{
        try {
            const updatePost = await this.prisma.posts.update({
                where: { id : postId},
                data: updatePostDto
            })
            if(!updatePost){
                throw new NotFoundException(`Post ${postId} not found`)
            }
            return updatePost
        } catch (error) {
            throw error;
        }
    }
}
