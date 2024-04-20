import { ApiProperty } from '@nestjs/swagger';

export class ToggleImageDto {
  @ApiProperty({
    description: 'Flag para ativar ou desativar a imagem',
    example: false,
  })
  flAtivo: boolean;
}
