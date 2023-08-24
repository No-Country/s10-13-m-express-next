import { ApiProperty } from '@nestjs/swagger';

export class LocalRequestDto {
  @ApiProperty({ description: 'Correo electrónico del usuario' })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  password: string;
}
