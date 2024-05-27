import { Controller, Get, Param } from '@nestjs/common';
import { FazendasCoordenadasService } from './fazendas-coordenadas.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { FazendaCoordsResponseDto } from './dto/FazendaCoordsResponseDto';

@Controller('fazendas-coordenadas')
export class FazendasCoordenadasController {
  constructor(
    private readonly fazendasCoordenadasService: FazendasCoordenadasService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma fazenda pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Operação bem-sucedida',
    type: FazendaCoordsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Fazenda não encontrada' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID da fazenda',
    type: 'number',
  })
  async getCoordsFazenda(@Param('id') fazendaId: number): Promise<any> {
    return await this.fazendasCoordenadasService.getCoordsFazenda(fazendaId);
  }
}
