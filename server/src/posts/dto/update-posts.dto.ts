import { PartialType } from '@nestjs/swagger';
import { CreatePostsDto } from './create-posts.dto';

export class UpdatePostDto extends PartialType(CreatePostsDto){}