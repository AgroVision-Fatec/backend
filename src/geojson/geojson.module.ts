import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GeojsonController } from './geojson.controller';
import { GeojsonService } from './geojson.service';
import { FazendasModule } from '../fazendas/fazendas.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueName}${extname(file.originalname)}`);
        },
      }),
    }),
    FazendasModule,  // Certifique-se de que FazendasModule esteja importado aqui
  ],
  controllers: [GeojsonController],
  providers: [GeojsonService], // Certifique-se de que GeojsonService esteja fornecido aqui
  exports: [GeojsonService], // Exporte GeojsonService para que esteja disponível em outros módulos, se necessário
})
export class GeojsonModule {}
