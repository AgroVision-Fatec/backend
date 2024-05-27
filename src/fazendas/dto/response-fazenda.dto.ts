import { ApiProperty } from '@nestjs/swagger';
import { Talhao } from 'src/talhoes/talhoes.entity';

export class FazendaResponseDto {
  @ApiProperty({ example: 1, description: 'ID da fazenda' })
  id_fazenda: number;

  @ApiProperty({
    example: 'Fazenda Boa Esperança',
    description: 'Nome da fazenda',
  })
  nome_fazenda: string;

  @ApiProperty({
    example: 'Geográfica',
    description: 'Tipo de coordenada da fazenda',
  })
  tipo_Coordenadas: string;

  @ApiProperty({
    example: 1,
    description: 'ID do usuário dono da fazenda',
  })
  id_usuario?: number;

  @ApiProperty({
    example: 1,
    description: 'ID do usuário dono da fazenda',
  })
  talhao?: any;
}
