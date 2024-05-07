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
import { ArmadilhasService } from './armadilhas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ArmadilhaResponseDto } from './dto/response-armadilha.dto';
import { CreateArmadilhaDto } from './dto/create-armadilhas.dto';
import { UpdateArmadilhaDto } from './dto/update-armadilha.dto';
import { ArmadilhaDeleteResponseDto } from './dto/response-delete-armadilha.dto';
import { DadosArmadilhaResponseDto } from 'src/dados-armadilhas/dto/response-dados-armadilhas.dto';
import { Armadilha } from './armadilhas.entity';

@ApiTags('armadilhas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('armadilhas')
export class ArmadilhasController {
  constructor(private readonly armadilhasService: ArmadilhasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Criar uma nova armadilha' })
  @ApiResponse({
    status: 201,
    description: 'A armadilha foi criada com sucesso.',
    type: ArmadilhaResponseDto,
  })
  @ApiBody({ type: CreateArmadilhaDto })
  async create(
    @Body() createArmadilhaDto: CreateArmadilhaDto,
  ): Promise<Armadilha> {
    return this.armadilhasService.create(createArmadilhaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as armadilhas' })
  @ApiResponse({
    status: 200,
    description: 'Armadilhas listadas com sucesso.',
    type: [ArmadilhaResponseDto],
  })
  async findAll(): Promise<Armadilha[]> {
    return this.armadilhasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma armadilha pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Armadilha encontrada com sucesso.',
    type: ArmadilhaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Armadilha não encontrada' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID da armadilha',
    type: Number,
  })
  async findOne(@Param('id') id: number): Promise<Armadilha> {
    return this.armadilhasService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Atualizar uma armadilha pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'A armadilha foi atualizada com sucesso.',
    type: ArmadilhaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Armadilha não encontrada' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID da armadilha que será atualizada',
    type: Number,
  })
  @ApiBody({ type: UpdateArmadilhaDto })
  async update(
    @Param('id') id: number,
    @Body() updateArmadilhaDto: UpdateArmadilhaDto,
  ): Promise<DadosArmadilhaResponseDto> {
    return this.armadilhasService.update(id, updateArmadilhaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma armadilha pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'A armadilha foi deletada com sucesso.',
    type: ArmadilhaDeleteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Armadilha não encontrada' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID da armadilha que será deletada',
    type: Number,
  })
  async remove(@Param('id') id: number): Promise<ArmadilhaDeleteResponseDto> {
    return this.armadilhasService.remove(id);
  }
}
