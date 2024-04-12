import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTalhaoDto {
  @ApiProperty({ example: 'Talhão 1', description: 'Nome do talhão' })
  @IsString()
  @IsNotEmpty()
  nome_talhao: string;

  @ApiProperty({
    example: 'Geográfica',
    description: 'Tipo de coordenada do talhão',
    required: false,
  })
  @IsString()
  @IsOptional()
  tipo_coordenada?: string;

  @ApiProperty({
    example: '-15.7942287,-47.8821658',
    description: 'Coordenadas do talhão',
    required: false,
  })
  @IsString()
  @IsOptional()
  coordenadas?: string;

  @ApiProperty({
    example: 1,
    description: 'ID da fazenda associada ao talhão',
  })
  @IsInt()
  id_fazenda: number;
}
