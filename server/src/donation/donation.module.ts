import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DonationController],
  providers: [DonationService, PrismaService]
})
export class DonationModule {}
