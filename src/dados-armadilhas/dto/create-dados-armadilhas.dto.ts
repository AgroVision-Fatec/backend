import { IsString, IsNotEmpty, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDadosArmadilhaDto {
  @ApiProperty({
    description: 'Tipo de praga capturada pela armadilha',
    example: 'Mosca das Frutas',
  })
  @IsString()
  @IsNotEmpty()
  tipo_praga: string;

  @ApiProperty({
    description: 'Quantidade de pragas capturadas',
    example: 20,
  })
  @IsInt()
  quantidade: number;

  @ApiProperty({
    description: 'Data da coleta dos dados',
    example: '2023-10-01T14:48:00',
  })
  @IsDate()
  @Type(() => Date)
  data_coleta: Date;

  @ApiProperty({
    description: 'ID da armadilha que coletou os dados',
    example: 1,
  })
  @IsInt()
  id_armadilha: number;
}
