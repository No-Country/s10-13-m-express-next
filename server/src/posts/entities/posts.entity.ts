import { Posts as ModelPosts } from "@prisma/client";
import { IsNotEmpty} from "class-validator";

export class PostsEntity implements ModelPosts {
    id: string;
    @IsNotEmpty({ message: 'userId is required' })
    userId: string;
    @IsNotEmpty({ message: 'description is required' })
    description: string;
    createdAt: Date;
    @IsNotEmpty({ message: 'galery is required' })
    galery: string;
}