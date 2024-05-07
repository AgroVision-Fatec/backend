// src/files/files.module.ts
import { Module } from '@nestjs/common';
import { S3Service } from '../s3/s3.service'; // Ajuste o caminho conforme necessário
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [S3Service],  // Inclua o S3Service aqui
  exports: [S3Service]     // Exporte o S3Service se for usar em outros módulos
})
export class FilesModule {}
