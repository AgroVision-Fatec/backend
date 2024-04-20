import { Module } from '@nestjs/common';
import { FazendasCoordenadasController } from './fazendas-coordenadas.controller';
import { FazendasCoordenadasService } from './fazendas-coordenadas.service';

@Module({
  controllers: [FazendasCoordenadasController],
  providers: [FazendasCoordenadasService]
})
export class FazendasCoordenadasModule {}
