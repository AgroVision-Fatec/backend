// src/app.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { GeojsonController } from './geojson.controller';
import { GeojsonService } from './geojson.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [GeojsonController],
  providers: [GeojsonService],
})
export class GeojsonModule {}
