import { ApiProperty } from '@nestjs/swagger';

export class ArmadilhaDeleteResponseDto {
  @ApiProperty({ example: 'Armadilha deletada com sucesso.' })
  message: string;
}
