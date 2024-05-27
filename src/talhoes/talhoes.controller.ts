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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TalhoesService } from './talhoes.service';
import { CreateTalhaoDto } from './dto/create-talhao.dto';
import { UpdateTalhaoDto } from './dto/update-talhao.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { TalhaoResponseDto } from './dto/response-talhao.dto';
import { TalhaoDeleteResponseDto } from './dto/response-delete-talhao.dto';
import { Fazenda } from 'src/fazendas/fazenda.entity';
import { Talhao } from './talhoes.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { GeojsonService } from 'src/geojson/geojson.service';

@ApiTags('talhoes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('talhoes')
export class TalhoesController {
  constructor(private readonly talhoesService: TalhoesService,
    private readonly geojsonService: GeojsonService,
  ) { }

  // @Post()
  // @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  // @ApiOperation({ summary: 'Criar um novo talhão' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'O talhão foi criado com sucesso.',
  //   type: TalhaoResponseDto,
  // })
  // @ApiBody({ type: CreateTalhaoDto })
  // async create(
  //   @Body() createTalhaoDto: CreateTalhaoDto,
  // ): Promise<TalhaoResponseDto> {
  //   return this.talhoesService.create(createTalhaoDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos os talhões' })
  @ApiResponse({
    status: 200,
    description: 'Lista de talhões obtida com sucesso.',
    type: [TalhaoResponseDto],
  })
  async findAll(): Promise<TalhaoResponseDto[]> {
    return this.talhoesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obter um talhão pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados do talhão obtidos com sucesso.',
    type: TalhaoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Talhão não encontrado' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID do talhão',
    type: Number,
  })
  async findOne(@Param('id') id: number): Promise<TalhaoResponseDto> {
    return this.talhoesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Atualizar um talhão pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'O talhão foi atualizado com sucesso.',
    type: TalhaoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Talhão não encontrado' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID do talhão que será atualizado',
    type: Number,
  })
  @ApiBody({
    type: UpdateTalhaoDto,
    description: 'Dados para atualizar o talhão',
  })
  async update(
    @Param('id') id: number,
    @Body() updateTalhaoDto: UpdateTalhaoDto,
  ): Promise<TalhaoResponseDto> {
    return this.talhoesService.update(id, updateTalhaoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um talhão pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'O talhão foi deletado com sucesso.',
    type: TalhaoDeleteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Talhão não encontrado' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID do talhão que será deletado',
    type: Number,
  })
  async remove(@Param('id') id: number): Promise<TalhaoDeleteResponseDto> {
    return this.talhoesService.remove(id);
  }


  @Get('findByIdFazenda/:idFazenda')
  @ApiOperation({ summary: 'Encontrar talhões por ID da fazenda' })
  @ApiResponse({
    status: 200,
    description: 'Talhões encontrados',
    type: [TalhaoResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Nenhum talhão encontrado' })
  @ApiParam({ name: 'idFazenda', description: 'ID da fazenda' })
  async findOneByEmail(@Param('idFazenda') idFazenda: number): Promise<Talhao[]> {
    try {
      return await this.talhoesService.FindByIdFazenda(idFazenda);
    } catch (error) {
      console.log('erro ao buscar talhoes por id fazenda');
    }
  }

  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a GeoJSON file' })
  @ApiResponse({ status: 200, description: 'The file has been successfully uploaded.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async createFromGeoJSONS(
    @Param('userId') userId: number, @UploadedFile() file: Express.Multer.File): Promise<any> {
    const salvo = await this.geojsonService.readGeoJSON(file.path);
    const talhoes = await this.talhoesService.createFromGeoJSONS(salvo, userId);
    return talhoes.map(talhao => this.talhoesService.mapToResponseDto(talhao));
  }
}

