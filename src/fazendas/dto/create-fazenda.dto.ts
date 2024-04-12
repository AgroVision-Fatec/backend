import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFazendaDto {
  @ApiProperty({
    description: 'Nome da fazenda',
    maxLength: 100,
    example: 'Fazenda Santa Luzia',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  nome: string;

  @ApiProperty({
    description:
      'Tipo de coordenada usada na localização da fazenda (ex: geográfica, UTM)',
    required: false,
    example: 'geográfica',
  })
  @IsOptional()
  @IsString()
  tipoCoordenada?: string;

  @ApiProperty({
    description: 'Coordenadas da localização da fazenda',
    required: false,
    example: '-15.7942287,-47.8821658',
  })
  @IsOptional()
  @IsString()
  coordenadas?: string;
}
