import { ApiProperty } from '@nestjs/swagger';

export class DadosArmadilhaResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID do registro de dados da armadilha',
  })
  id_dados_armadilha: number;

  @ApiProperty({
    example: 'Mosca das Frutas',
    description: 'Tipo de praga capturada pela armadilha',
  })
  tipo_praga: string;

  @ApiProperty({ example: 20, description: 'Quantidade de pragas capturadas' })
  quantidade: number;

  @ApiProperty({
    example: '2023-10-01T14:48:00',
    description: 'Data da coleta dos dados',
  })
  data_coleta: Date;

  @ApiProperty({
    example: 1,
    description: 'ID da armadilha que coletou os dados',
  })
  id_armadilha: number;
}
