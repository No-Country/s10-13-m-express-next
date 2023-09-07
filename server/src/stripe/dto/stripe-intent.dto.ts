import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStripeIntentDto{
    @ApiProperty({
        description: 'Amount of donation to be made',
        nullable: false,
        minLength: 1,
        example: 12,
      })
    @IsNotEmpty({ message: 'amount is required' })
    @IsNumber()
    amount: number

    @ApiProperty({
        description: 'User id of the user making the donation',
        nullable: false,
        minLength: 24,
        example: '64e83e47891866a96b5977c1',
      })
    @IsNotEmpty({ message: 'userId is required' })
    @IsString()
    userId: string

    @ApiProperty({
        description: 'Initiative id of the initiative to which the donation is directed, in case of a donation to the volunteer page send "globalDonation".',
        nullable: false,
        example: '64e83e47891866a96b5977c1',
      })
    @IsNotEmpty({ message: 'initiativeId is required' })
    @IsString()
    initiativeId: string
}