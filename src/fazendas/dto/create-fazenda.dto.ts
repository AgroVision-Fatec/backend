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
  nome_fazenda: string;

  @ApiProperty({
    description:
      'Tipo de coordenada usada na localização da fazenda (ex: geográfica, UTM)',
    required: false,
    example: 'geográfica',
  })
  @IsOptional()
  @IsString()
  tipo_Coordenadas?: string;

  @ApiProperty({
    description: 'ID do usuário dono da fazenda',
    example: 1,
  })
  @IsNotEmpty()
  id_usuario: number;
}
