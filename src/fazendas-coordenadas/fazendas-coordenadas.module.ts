import { Module } from '@nestjs/common';
import { FazendasCoordenadasController } from './fazendas-coordenadas.controller';
import { FazendasCoordenadasService } from './fazendas-coordenadas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FazendaCoordenadas } from './fazenda-coordenadas.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FazendaCoordenadas])
  ],
  controllers: [FazendasCoordenadasController],
  providers: [FazendasCoordenadasService],
  exports: [FazendasCoordenadasService],
})
export class FazendasCoordenadasModule {}
