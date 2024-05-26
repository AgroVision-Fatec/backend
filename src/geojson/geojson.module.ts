import { Module, forwardRef } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GeojsonController } from './geojson.controller';
import { GeojsonService } from './geojson.service';
import { FazendasModule } from '../fazendas/fazendas.module';
import { TalhoesModule } from 'src/talhoes/talhoes.module';

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
    forwardRef(() => TalhoesModule),
    forwardRef(() => FazendasModule),

  ],
  controllers: [GeojsonController],
  providers: [GeojsonService],
  exports: [GeojsonService, MulterModule],
})
export class GeojsonModule {}
