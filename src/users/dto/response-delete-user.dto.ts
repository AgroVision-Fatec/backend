import { ApiProperty } from '@nestjs/swagger';

export class UserDeleteResponseDto {
  @ApiProperty({ example: 'Usuário deletado com sucesso.' })
  message: string;
}
