// talhoes.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TalhoesService } from './talhoes.service';
import { TalhoesController } from './talhoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talhao } from './talhoes.entity';
import { Fazenda } from 'src/fazendas/fazenda.entity';
import { TalhoesCoordenadas } from 'src/talhoes-coordenadas/talhoes-coordenadas.entity';
import { TalhoesCoordenadasModule } from 'src/talhoes-coordenadas/talhoes-coordenadas.module';
import { GeojsonModule } from 'src/geojson/geojson.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Talhao, Fazenda, TalhoesCoordenadas]),
    forwardRef(() => GeojsonModule),
    TalhoesCoordenadasModule,
  ],
  providers: [TalhoesService],
  controllers: [TalhoesController],
})
export class TalhoesModule {}
