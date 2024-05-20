import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fazenda } from './fazenda.entity';
import { FazendaCoordenadas } from './fazenda-coordenadas.entity';
import { FazendasService } from './fazendas.service';
import { FazendasCoordenadasService } from '../fazendas-coordenadas/fazendas-coordenadas.service';
import { FazendasController } from './fazendas.controller';
import { GeojsonModule } from '../geojson/geojson.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fazenda]),
    forwardRef(() => GeojsonModule), // Usando forwardRef para evitar dependência circular
  ],
  providers: [FazendasService, FazendasCoordenadasService],
  controllers: [FazendasController],
  exports: [FazendasService], // Exportando FazendasService
})

export class FazendasModule {}
