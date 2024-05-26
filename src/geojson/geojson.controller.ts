// src/geojson/geojson.controller.ts
import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiOperation, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { GeojsonService } from './geojson.service';
import { FazendasService } from '../fazendas/fazendas.service';
import { TalhoesService } from 'src/talhoes/talhoes.service'; 
import { TalhoesModule } from 'src/talhoes/talhoes.module';
@ApiTags('geojson')
@Controller('geojson')
export class GeojsonController {
  constructor(
    private readonly geojsonService: GeojsonService,
    private readonly fazendasService: FazendasService,
    private readonly talhoesService: TalhoesService
  ) {}

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
  async uploadFile(@Param('userId') userId: number,@UploadedFile() file: Express.Multer.File): Promise<any> {
    const salvo = await this.geojsonService.readGeoJSON(file.path);
    await this.fazendasService.createFromGeoJSON(userId, salvo);
    // await this.talhoesService.createFromGeoJSONS(salvo);
    return salvo;
  }
}
// 