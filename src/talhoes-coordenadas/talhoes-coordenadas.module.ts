import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talhao } from 'src/talhoes/talhoes.entity';
import { TalhoesCoordenadas } from 'src/talhoes-coordenadas/talhoes-coordenadas.entity';
import { TalhoesCoordenadasService } from 'src/talhoes-coordenadas/talhoes-coordenadas.service'
import { TalhoesCoordenadasController } from './talhoes-coordenadas.controller';



@Module({
  imports: [
    TypeOrmModule.forFeature([TalhoesCoordenadas]),
  ],
  providers: [
    TalhoesCoordenadasService,

  ],
  controllers: [TalhoesCoordenadasController],
  exports: [TalhoesCoordenadasService],
})
export class TalhoesCoordenadasModule { }
