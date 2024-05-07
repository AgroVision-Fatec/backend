import { ApiProperty } from '@nestjs/swagger';

export class ArmadilhaResponseDto {
  @ApiProperty({ example: 1, description: 'ID da armadilha' })
  id_armadilha: number;

  @ApiProperty({
    example: 'Geográfica',
    description: 'Tipo de coordenada da armadilha',
  })
  tipo_coordenada: string;

  @ApiProperty({
    example: '-15.7942287,-47.8821658',
    description: 'Coordenadas da armadilha',
  })
  coordenadas: string;

  @ApiProperty({
    example: 1,
    description: 'ID do talhão associado à armadilha',
  })
  id_talhao: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL da imagem da armadilha',
  })
  url_imagem: string;
}
