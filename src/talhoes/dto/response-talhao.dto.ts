import { ApiProperty } from '@nestjs/swagger';

export class TalhaoResponseDto {
  @ApiProperty({ example: 1, description: 'ID do talhão' })
  id_talhao: number;

  @ApiProperty({ example: 'Talhão 1', description: 'Nome do talhão' })
  nome_talhao: string;

  @ApiProperty({
    example: 'Geográfica',
    description: 'Tipo de coordenada do talhão',
  })
  tipo_coordenada: string;

  @ApiProperty({ example: 1, description: 'ID da fazenda associada' })
  id_fazenda: number;
}
