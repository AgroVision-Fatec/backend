// src/users/dto/user-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  id_usuario: number;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'John Doe',
  })
  nome: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Número de telefone do usuário',
    example: '+1234567890',
  })
  telefone: string; // Ensure this is consistently a string
}
