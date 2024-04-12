import { ApiProperty } from '@nestjs/swagger';

export class TalhaoDeleteResponseDto {
  @ApiProperty({ example: 'Talhão deletado com sucesso.' })
  message: string;
}
