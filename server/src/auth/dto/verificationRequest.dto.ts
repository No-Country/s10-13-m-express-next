import { ApiProperty } from '@nestjs/swagger';

export class VerificationRequestDto {
  @ApiProperty({
    description: 'ID del usuario que queremos verificar la sesion',
  })
  userId: string;
}
