import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArmadilhaDto {
  @ApiProperty({
    example: 'Geográfica',
    description: 'Tipo de coordenada da armadilha',
  })
  @IsString()
  @IsNotEmpty()
  tipo_coordenada: string;

  @ApiProperty({
    example: '-15.7942287,-47.8821658',
    description: 'Coordenadas da armadilha',
  })
  @IsString()
  @IsNotEmpty()
  coordenadas: string;

  @ApiProperty({
    example: 1,
    description: 'ID do talhão associado à armadilha',
  })
  @IsInt()
  id_talhao: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL da imagem da armadilha',
  })
  @IsString()
  url_imagem: string;
}
