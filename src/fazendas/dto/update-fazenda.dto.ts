import { IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFazendaDto {
  @ApiProperty({
    description: 'Nome da fazenda',
    maxLength: 100,
    example: 'Fazenda Santa Luzia',
    required: false, // Indica que o campo é opcional na atualização
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nome?: string;

  @ApiProperty({
    description:
      'Tipo de coordenada usada na localização da fazenda (ex: geográfica, UTM)',
    example: 'geográfica',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipoCoordenada?: string;

  @ApiProperty({
    description: 'Coordenadas da localização da fazenda',
    example: '-15.7942287,-47.8821658',
    required: false,
  })
  @IsOptional()
  @IsString()
  coordenadas?: string;
}
