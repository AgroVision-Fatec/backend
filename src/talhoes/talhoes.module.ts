// talhoes.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TalhoesService } from './talhoes.service';
import { TalhoesController } from './talhoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talhao } from './talhoes.entity';
import { TalhoesCoordenadasModule } from 'src/talhoes-coordenadas/talhoes-coordenadas.module';
import { GeojsonModule } from 'src/geojson/geojson.module';
import { FazendasModule } from 'src/fazendas/fazendas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Talhao]),
    forwardRef(() => GeojsonModule),
    forwardRef(() => TalhoesCoordenadasModule),
    forwardRef(() => FazendasModule),
  ],
  providers: [TalhoesService],
  controllers: [TalhoesController],
  exports: [TalhoesService],
})
export class TalhoesModule {}
