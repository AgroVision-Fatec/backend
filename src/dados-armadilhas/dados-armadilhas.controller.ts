import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { DadosArmadilhasService } from './dados-armadilhas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { DadosArmadilhaResponseDto } from './dto/response-dados-armadilhas.dto';
import { CreateDadosArmadilhaDto } from './dto/create-dados-armadilhas.dto';
import { UpdateDadosArmadilhaDto } from './dto/update-dados-armadilhas.dto';
import { DadosArmadilhaDeleteResponseDto } from './dto/response-delete-dados-armadilhas.dto';
import { DadosArmadilhas } from './dados-armadilhas.entity';

@ApiTags('dados-armadilhas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dados-armadilhas')
export class DadosArmadilhasController {
  constructor(
    private readonly dadosArmadilhasService: DadosArmadilhasService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Criar novo registro de dados para uma armadilha' })
  @ApiResponse({
    status: 201,
    description: 'Dados da armadilha criados com sucesso.',
    type: DadosArmadilhaResponseDto,
  })
  @ApiBody({ type: CreateDadosArmadilhaDto })
  async create(
    @Body() createDadosArmadilhaDto: CreateDadosArmadilhaDto,
  ): Promise<DadosArmadilhas> {
    return this.dadosArmadilhasService.create(createDadosArmadilhaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros de dados de armadilhas' })
  @ApiResponse({
    status: 200,
    description: 'Dados das armadilhas listados com sucesso.',
    type: [DadosArmadilhaResponseDto],
  })
  async findAll(): Promise<DadosArmadilhas[]> {
    return this.dadosArmadilhasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter dados de uma armadilha pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados da armadilha obtidos com sucesso.',
    type: DadosArmadilhaResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Dados da armadilha não encontrados',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do registro de dados da armadilha',
    type: Number,
    required: true,
  })
  async findOne(@Param('id') id: number): Promise<DadosArmadilhas> {
    return this.dadosArmadilhasService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Atualizar os dados de uma armadilha pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados da armadilha atualizados com sucesso.',
    type: DadosArmadilhaResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Dados da armadilha não encontrados',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do registro de dados para atualização',
    type: Number,
    required: true,
  })
  @ApiBody({ type: UpdateDadosArmadilhaDto })
  async update(
    @Param('id') id: number,
    @Body() updateDadosArmadilhaDto: UpdateDadosArmadilhaDto,
  ): Promise<DadosArmadilhas> {
    return this.dadosArmadilhasService.update(id, updateDadosArmadilhaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar os dados de uma armadilha pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados da armadilha deletados com sucesso.',
    type: DadosArmadilhaDeleteResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Dados da armadilha não encontrados',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do registro de dados da armadilha para deletar',
    type: Number,
    required: true,
  })
  async remove(
    @Param('id') id: number,
  ): Promise<DadosArmadilhaDeleteResponseDto> {
    return this.dadosArmadilhasService.remove(id);
  }



  @Get('/findByLatest/:id')
  @ApiOperation({ summary: 'Obter dados de uma armadilha pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados da armadilha obtidos com sucesso.',
    type: DadosArmadilhaResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Dados da armadilha não encontrados',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do registro de dados da armadilha',
    type: Number,
    required: true,
  })
  async findByLatest(@Param('id') id: number): Promise<DadosArmadilhas> {
    return this.dadosArmadilhasService.findByLatest(id);
  }

}
