import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talhao } from 'src/talhoes/talhoes.entity';
import { TalhoesCoordenadas } from 'src/talhoes-coordenadas/talhoes-coordenadas.entity';
import { TalhoesCoordenadasService } from 'src/talhoes-coordenadas/talhoes-coordenadas.service'



@Module({
  imports: [
    TypeOrmModule.forFeature([TalhoesCoordenadas]),
  ],
  providers: [
    TalhoesCoordenadasService,

  ],
  exports: [TalhoesCoordenadasService],
})
export class TalhoesCoordenadasModule {}
