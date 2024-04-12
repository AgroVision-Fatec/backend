import { ApiProperty } from '@nestjs/swagger';

export class FazendaDeleteResponseDto {
  @ApiProperty({ example: 'Fazenda deletada com sucesso.' })
  message: string;
}
