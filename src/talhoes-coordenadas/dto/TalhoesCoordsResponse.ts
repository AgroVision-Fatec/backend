import { ApiProperty } from '@nestjs/swagger';

export class TalhoesCoordsResponse {
  @ApiProperty({ example: 1, description: 'ID do talhao' })
  id_talhao: number;

  @ApiProperty({
    example: 1,
    description: 'ID da coordenada',
  })
  id_coordenada: number;

  @ApiProperty({
    example: -23.563099,
    description: 'Latitude da coordenada',
  })
  latitude: number;

  @ApiProperty({
    example: -46.656571,
    description: 'Longitude da coordenada',
  })
  longitude: number;
}
