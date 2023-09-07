import {
  Controller,
  Post,
  Body,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeIntentDto } from './dto/stripe-intent.dto';

@Controller('create-checkout-session')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post()
  async createPaymentIntent(@Body() createStripeIntent: CreateStripeIntentDto) {
    try {
      const sessionUrl =
        await this.stripeService.createPaymentIntent(createStripeIntent);
      return { sessionUrl, message: 'Session payment create successful' };
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
