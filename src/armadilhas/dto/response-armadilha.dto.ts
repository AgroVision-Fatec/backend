import { ApiProperty } from '@nestjs/swagger';

export class ArmadilhaResponseDto {
  @ApiProperty({ example: 1, description: 'ID da armadilha' })
  id_armadilha: number;

  @ApiProperty({
    example: 'Geográfica',
    description: 'Tipo de coordenada da armadilha',
  })
  tipo_coordenada: string;

  // latitude
  @ApiProperty({
    example: -12.345678,
    description: 'Latitude da localização da armadilha',
  })
  latitude: number;
  // longitude
  @ApiProperty({
    example: -12.345678,
    description: 'Longitude da localização da armadilha',
  })
  longitude: number;

  @ApiProperty({
    example: 1,
    description: 'ID do talhão associado à armadilha',
  })
  talhao: any;
}
