import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StripeController],
  providers: [StripeService, PrismaService]
})
export class StripeModule {}
