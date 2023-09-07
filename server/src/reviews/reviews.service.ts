import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { validate } from 'class-validator';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    try {
      const errors = await validate(createReviewDto);
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
      const existingUser = await this.prisma.user.findUnique({
        where: { id: createReviewDto.userIDs },
      });

      if (!existingUser) {
        throw new ConflictException('User ID no found');
      }
      const newReview = await this.prisma.review.create({
        data: createReviewDto,
      });

      return newReview;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Review[]> {
    try {
      const reviews = await this.prisma.review.findMany();
      if (reviews.length === 0) {
        throw new ConflictException('Reviews not found');
      } else {
        return reviews;
      }
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Review> {
    try {
      const review = await this.prisma.review.findUnique({
        where: { id: id },
      });
      if (!review) {
        throw new ConflictException('Review ID not found');
      } else {
        return review;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    try {
      const updateReview = await this.prisma.review.update({
        where: { id: id },
        data: updateReviewDto,
      });
      if (!updateReview) {
        throw new NotFoundException(`Review ${id} not found`);
      }
      return updateReview;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const deleteReview = await this.prisma.review.delete({
        where: { id: id },
      });
      if (!deleteReview) {
        throw new NotFoundException(`Post ${id} not found`);
      }
      return deleteReview;
    } catch (error) {
      throw error;
    }
  }
}
