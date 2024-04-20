// src/imagens/imagens.controller.ts
import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ImagensService } from './imagens.service';
import { CreateImageDto } from './dto/create-image.dto';
import { ToggleImageDto } from './dto/toggle-image.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('imagens')
@Controller('imagens')
export class ImagensController {
  constructor(private readonly imagensService: ImagensService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova imagem' })
  @ApiResponse({ status: 201, description: 'A imagem foi criada com sucesso.' })
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagensService.create(createImageDto);
  }

  @Get('by-armadilha/:idArmadilha')
  @ApiOperation({ summary: 'Busca imagens por ID da armadilha' })
  @ApiResponse({ status: 200, description: 'Operação bem-sucedida.' })
  findByArmadilha(@Param('idArmadilha') idArmadilha: number) {
    return this.imagensService.findByArmadilha(idArmadilha);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Ativa ou desativa uma imagem' })
  @ApiBody({ type: ToggleImageDto })
  @ApiResponse({
    status: 200,
    description: 'Estado da imagem atualizado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Imagem não encontrada.' })
  toggleActive(
    @Param('id') id: number,
    @Body() toggleImageDto: ToggleImageDto,
  ) {
    return this.imagensService.toggleActive(id, toggleImageDto.flAtivo);
  }
}
