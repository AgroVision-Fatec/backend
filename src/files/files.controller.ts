// src/files/files.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3/s3.service'; // Ajuste o caminho conforme necessário
import * as mime from 'mime-types';

@Controller('files')
export class FilesController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const sanitizedFileName = file.originalname.replace(/\s+/g, '-'); // Remove espaços
    const mimeType =
      mime.lookup(file.originalname) || 'application/octet-stream'; // Determina o tipo MIME
    const filePath = `uploads/${Date.now()}-${sanitizedFileName}`;
    const fileUrl = await this.s3Service.uploadFile(
      file.buffer,
      filePath,
      mimeType,
    ); // Passa o mimeType para o serviço S3
    return { url: fileUrl };
  }

  //   listando a quantidade de imagens salvas no S3
  @Get('list')
  async listFiles() {
    return this.s3Service.listFiles();
  }

  //   @Get(':path')
  //   async getFile(@Param('path') path: string, @Res() res: Response) {
  //     const fileBuffer = await this.s3Service.downloadFile(path);
  //     const streamableFile = new StreamableFile(fileBuffer);
  //     res.set({
  //       'Content-Type': 'application/octet-stream',
  //       'Content-Disposition': `attachment; filename="${path}"`,
  //     });
  //     return streamableFile;
  //   }
}
