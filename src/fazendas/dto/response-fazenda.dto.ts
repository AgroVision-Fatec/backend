import { ApiProperty } from '@nestjs/swagger';

export class FazendaResponseDto {
  @ApiProperty({ example: 1, description: 'ID da fazenda' })
  id_fazenda: number;

  @ApiProperty({
    example: 'Fazenda Boa Esperança',
    description: 'Nome da fazenda',
  })
  nome: string;

  @ApiProperty({
    example: 'Geográfica',
    description: 'Tipo de coordenada da fazenda',
  })
  tipoCoordenada: string;

  @ApiProperty({
    example: '-15.7942287,-47.8821658',
    description: 'Coordenadas da fazenda',
  })
  coordenadas: string;
}
