import { ApiProperty } from '@nestjs/swagger';
import { Talhao } from 'src/talhoes/talhoes.entity';

class CoordenadaDto {
  @ApiProperty({ example: 1, description: 'ID da coordenada' })
  id: number;

  @ApiProperty({ example: -15.7801, description: 'Latitude da coordenada' })
  latitude: number;

  @ApiProperty({ example: -47.9292, description: 'Longitude da coordenada' })
  longitude: number;
}

class TalhaoDto {
  @ApiProperty({ example: 1, description: 'ID do talhão' })
  id: number;

  @ApiProperty({ example: 'Talhão 1', description: 'Nome do talhão' })
  nome: string;

  @ApiProperty({ type: [CoordenadaDto], description: 'Coordenadas do talhão' })
  coordenadas: CoordenadaDto[];
}

export class FazendaALLDTO {
  @ApiProperty({ example: 1, description: 'ID da fazenda' })
  id_fazenda: number;

  @ApiProperty({ example: 'Fazenda Boa Esperança', description: 'Nome da fazenda' })
  nome_fazenda: string;

  @ApiProperty({ example: 'Geográfica', description: 'Tipo de coordenada da fazenda' })
  tipo_Coordenadas: string;

  @ApiProperty({ example: 1, description: 'ID do usuário dono da fazenda' })
  id_usuario?: number;

  @ApiProperty({ type: [TalhaoDto], description: 'Talhões da fazenda' })
  talhoes: TalhaoDto[];
}
