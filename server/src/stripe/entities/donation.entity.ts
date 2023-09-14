import { Donation } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class donationEntity implements Donation {
  id: string;
  @ApiProperty({
    description: 'Transaction Id',
    nullable: false,
    example: '64ff1079e0ee7e30d94dd140',
  })
  @IsNotEmpty({ message: 'Transaction Id is required' })
  TransactionId: string;
  @ApiProperty({
    description: 'Amount of donation',
    nullable: false,
    example: 10,
  })
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;
  createdAt: Date;
  @ApiProperty({
    description: 'User Id',
    nullable: false,
    example: '64ff1079e0ee7e30d94dd140',
  })
  @IsNotEmpty({ message: 'User Id is required' })
  userId: string;
  @ApiProperty({
    description: 'Initiative Id',
    nullable: false,
    example: '64ff1079e0ee7e30d94dd140',
  })
  initiativeID: string;
  isGlobalDonation: boolean;
}
