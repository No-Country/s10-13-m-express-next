import { OmitType } from '@nestjs/mapped-types';
import { PostsEntity } from '../entities/posts.entity';

export class CreatePostsDto extends OmitType(PostsEntity, ['id', 'createdAt']) {}