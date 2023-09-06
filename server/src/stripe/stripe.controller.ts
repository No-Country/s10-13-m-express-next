import {
  Controller,
  Post,
  Body,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeIntentDto } from './dto/stripe-intent.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post()
  async createPaymentIntent(@Body() createStripeIntent: CreateStripeIntentDto) {
    try {
      const clientSecret =
        await this.stripeService.createPaymentIntent(createStripeIntent);
      return {clientSecret, message: "Payment Intent create successful"};
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
