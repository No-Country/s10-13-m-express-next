import { Donation as Donation } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DonationEntity implements Donation {

}
