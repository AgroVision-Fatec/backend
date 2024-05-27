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
import { ArmadilhasService } from './armadilhas.service';
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
import { ArmadilhaResponseDto } from './dto/response-armadilha.dto';
import { CreateArmadilhaDto } from './dto/create-armadilhas.dto';
import { UpdateArmadilhaDto } from './dto/update-armadilha.dto';
import { ArmadilhaDeleteResponseDto } from './dto/response-delete-armadilha.dto';
import { DadosArmadilhaResponseDto } from 'src/dados-armadilhas/dto/response-dados-armadilhas.dto';
import { Armadilha } from './armadilhas.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { GeojsonService } from 'src/geojson/geojson.service';
import { DadosArmadilhasService } from 'src/dados-armadilhas/dados-armadilhas.service';

@ApiTags('armadilhas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('armadilhas')
export class ArmadilhasController {
  constructor(
    private readonly armadilhasService: ArmadilhasService,
    private readonly geojsonService: GeojsonService,
    private readonly dadosArmadilhasService: DadosArmadilhasService,
  ) {}

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

  // @Put(':id')
  // @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  // @ApiOperation({ summary: 'Atualizar uma armadilha pelo ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'A armadilha foi atualizada com sucesso.',
  //   type: ArmadilhaResponseDto,
  // })
  // @ApiResponse({ status: 404, description: 'Armadilha não encontrada' })
  // @ApiParam({
  //   name: 'id',
  //   required: true,
  //   description: 'ID da armadilha que será atualizada',
  //   type: Number,
  // })
  // @ApiBody({ type: UpdateArmadilhaDto })
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateArmadilhaDto: UpdateArmadilhaDto,
  // ): Promise<DadosArmadilhaResponseDto> {
  //   return this.armadilhasService.update(id, updateArmadilhaDto);
  // }

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

  @Get('findByIdTalhao/:idTalhao')
  @ApiOperation({ summary: 'Encontrar armadilhas por ID do Talhao' })
  @ApiResponse({
    status: 200,
    description: 'Armadilhas encontrados',
    type: [ArmadilhaResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Nenhuma Armadilha encontrado' })
  @ApiParam({ name: 'idTalhao', description: 'ID do talhao' })
  async findOneByEmail(
    @Param('idTalhao') idTalhao: number,
  ): Promise<Armadilha[]> {
    try {
      return await this.armadilhasService.FindByIdTalhao(idTalhao);
    } catch (error) {
      console.log('erro ao buscar armadilhas por id talhao');
    }
  }

  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a GeoJSON file' })
  @ApiResponse({
    status: 200,
    description: 'The file has been successfully uploaded.',
  })
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
    @Param('userId') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const salvo = await this.geojsonService.readGeoJSON(file.path);
    const armadila = await this.armadilhasService.createFromGeoJSONS(salvo, userId);
    return armadila.map(talhao => this.armadilhasService.mapToResponseDto(talhao));
  }
}
