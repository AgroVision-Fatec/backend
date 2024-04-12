import { ApiProperty } from '@nestjs/swagger';

export class DadosArmadilhaDeleteResponseDto {
  @ApiProperty({
    example: 'Dados da armadilha deletados com sucesso.',
    description:
      'Mensagem de confirmação após a exclusão de um registro de dados da armadilha.',
  })
  message: string;
}
