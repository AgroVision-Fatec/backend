import { Module } from '@nestjs/common';
import { TalhoesCoordenadasController } from './talhoes-coordenadas.controller';
import { TalhoesCoordenadasService } from './talhoes-coordenadas.service';

@Module({
  controllers: [TalhoesCoordenadasController],
  providers: [TalhoesCoordenadasService]
})
export class TalhoesCoordenadasModule {}
