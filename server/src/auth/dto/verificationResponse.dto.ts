import { ApiProperty } from '@nestjs/swagger';

export class VerificationResponseDto {
  @ApiProperty({ description: 'Confirmacion de verificacion' })
  verified: boolean;
}
