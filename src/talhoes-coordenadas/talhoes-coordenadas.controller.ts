import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TalhoesCoordenadasService } from './talhoes-coordenadas.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TalhoesCoordsResponse } from './dto/TalhoesCoordsResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('talhoes-coordenadas')
@ApiTags('talhoes-coordenadas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TalhoesCoordenadasController {
  constructor(
    private readonly talhoesCoordenadasService: TalhoesCoordenadasService,
  ) { }

  @Get(':id')
  @ApiOperation({ summary: 'Obter coordenadas de um talhao por id' })
  @ApiResponse({
    status: 200,
    description: 'Operação bem-sucedida',
    type: TalhoesCoordsResponse,
  })
  @ApiResponse({ status: 404, description: 'Talhão não encontrada' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID do talhao',
    type: 'number',
  })
  async getCoordsTalhao(@Param('id') talhaoId: number): Promise<any> {
    return await this.talhoesCoordenadasService.getCoordsTalhao(talhaoId);
  }
}
