import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  // UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { FazendasService } from './fazendas.service';
// import { CreateFazendaDto } from './dto/create-fazenda.dto';
import { UpdateFazendaDto } from './dto/update-fazenda.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  // ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FazendaDeleteResponseDto } from './dto/response-delete-fazenda.dto';
import { FazendaResponseDto } from './dto/response-fazenda.dto';

@ApiTags('fazendas')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('fazendas')
export class FazendasController {
  constructor(private readonly fazendasService: FazendasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Criar novas fazendas a partir de um arquivo GeoJSON' })
  @ApiResponse({
    status: 201,
    description: 'As fazendas foram criadas com sucesso.',
    type: [FazendaResponseDto],
  })
  @ApiBody({
    description: 'Caminho do arquivo GeoJSON',
  })
  async createFromGeoJSON(
    @Body('filePath') filePath: string,
  ): Promise<FazendaResponseDto[]> {
    const fazendas = await this.fazendasService.createFromGeoJSON(filePath);
    return fazendas.map(() => new FazendaResponseDto());
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as fazendas' })
  @ApiResponse({
    status: 200,
    description: 'Operação bem-sucedida',
    type: [FazendaResponseDto],
  })
  async findAll(): Promise<FazendaResponseDto[]> {
    return this.fazendasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma fazenda pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Operação bem-sucedida',
    type: FazendaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Fazenda não encontrada' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID da fazenda',
    type: 'number',
  })
  async findOne(@Param('id') id: number): Promise<FazendaResponseDto> {
    return this.fazendasService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Atualizar uma fazenda pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'A fazenda foi atualizada com sucesso.',
    type: FazendaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Fazenda não encontrada' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da fazenda que será atualizada',
  })
  @ApiBody({
    type: UpdateFazendaDto,
    description: 'Dados para atualizar uma fazenda',
  })
  async update(
    @Param('id') id: number,
    @Body() updateFazendaDto: UpdateFazendaDto,
  ): Promise<FazendaResponseDto> {
    return this.fazendasService.update(id, updateFazendaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma fazenda pelo ID' })
  @ApiResponse({
    status: 204,
    description: 'A fazenda foi deletada com sucesso.',
    type: FazendaDeleteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Fazenda não encontrada' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID da fazenda',
    type: 'number',
  })
  async remove(@Param('id') id: number): Promise<FazendaDeleteResponseDto> {
    await this.fazendasService.remove(id);
    return { message: 'Fazenda deletada com sucesso.' };
  }
}
