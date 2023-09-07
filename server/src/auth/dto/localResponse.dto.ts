import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'ID del usuario' })
  id: number;

  @ApiProperty({ description: 'Email del usuario' })
  email: string;

  @ApiProperty({ description: 'Proveedor de autenticación' })
  provider: string;
}

export class LocalResponseDto {
  @ApiProperty({ description: 'ID de la sesión' })
  sessionID: string;

  @ApiProperty({
    description: 'Información del usuario autenticado',
    type: User,
  })
  user: User;
}
