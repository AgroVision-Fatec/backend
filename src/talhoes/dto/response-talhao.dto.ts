import { ApiProperty } from '@nestjs/swagger';

export class TalhaoResponseDto {
  @ApiProperty()
  id_talhao: number;

  @ApiProperty()
  nome_talhao: string;

  @ApiProperty({
    example: 'Geográfica',
    description: 'Tipo de coordenada do talhão',
  })
  tipo_coordenada: string;

  @ApiProperty({ example: 1, description: 'ID da fazenda associada' })
  id_fazenda: number;
}
