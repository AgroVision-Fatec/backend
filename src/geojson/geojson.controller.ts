// src/geojson/geojson.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { GeojsonService } from './geojson.service';

@ApiTags('geojson')
@Controller('geojson')
export class GeojsonController {
  constructor(private readonly geojsonService: GeojsonService) {}

  @Post('upload')
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
        file: {
          type: 'string',
          format: 'binary', 
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return this.geojsonService.readGeoJSON(file.path);
  }
}
