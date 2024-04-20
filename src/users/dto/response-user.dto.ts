import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  id_usuario: number;

  @ApiProperty({ example: 'John Doe', description: 'Nome do usuário' })
  nome: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email do usuário' })
  email: string;

  @ApiProperty({ example: 1234567890, description: 'Telefone do usuário' })
  telefone: number;
}
