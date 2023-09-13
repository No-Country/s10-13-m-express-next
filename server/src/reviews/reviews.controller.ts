import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiBearerAuth()
@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @ApiTags('Reviews')
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    try {
      const newReview = await this.reviewsService.create(createReviewDto);
      return { newReview, message: 'Review created Successfully' };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      } else {
        throw new BadRequestException('Something bad happened', {
          cause: error,
        });
      }
    }
  }

  @Get()
  async findAll() {
    try {
      const reviews = await this.reviewsService.findAll();
      return { reviews, message: 'Reviews found Successfully' };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      } else {
        throw new BadRequestException('Something bad happened', {
          cause: error,
        });
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const review = await this.reviewsService.findOne(id);
      return { review, message: 'Review found Successfully' };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      } else {
        throw new BadRequestException('Something bad happened', {
          cause: error,
        });
      }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    try {
      const updateReview = await this.reviewsService.update(
        id,
        updateReviewDto,
      );
      return { updateReview, message: 'Review update Successfully' };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      } else {
        throw new BadRequestException('Something bad happened', {
          cause: error,
        });
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deleteReview = await this.reviewsService.remove(id);
      return { deleteReview, message: 'Review deleted Successfully' };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      } else {
        throw new BadRequestException('Something bad happened', {
          cause: error,
        });
      }
    }
  }
}
