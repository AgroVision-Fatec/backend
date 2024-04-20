import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({ description: 'Nome original do arquivo de imagem' })
  nomeOriginal: string;

  @ApiProperty({ description: 'Nome sob o qual o arquivo é salvo no servidor' })
  nomeSalvo: string;

  @ApiProperty({
    description: 'Identificador da armadilha associada à imagem',
    example: 1,
  })
  idArmadilha: number;
}
