import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTalhaoDto {
  @ApiProperty({
    example: 'Talhão 1 - Renomeado',
    description: 'Nome do talhão',
    required: false,
  })
  @IsString()
  @IsOptional()
  nome_talhao?: string;

  @ApiProperty({
    example: 'UTM',
    description: 'Tipo de coordenada do talhão',
    required: false,
  })
  @IsString()
  @IsOptional()
  tipo_coordenada?: string;

  @ApiProperty({
    example: '-15.7942287,-47.8821658, alterada',
    description: 'Coordenadas do talhão',
    required: false,
  })
  @IsInt()
  @IsOptional()
  id_fazenda?: number;
}
