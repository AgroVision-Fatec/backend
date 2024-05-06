// src/users/dto/user-delete-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UserDeleteResponseDto {
  @ApiProperty({
    description: 'Mensagem de confirmação de deleção do usuário',
    example: 'Usuário deletado com sucesso.',
  })
  message: string;
}
