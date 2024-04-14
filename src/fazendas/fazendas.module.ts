import { Module } from '@nestjs/common';
import { FazendasService } from './fazendas.service';
import { FazendasController } from './fazendas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fazenda } from './fazenda.entity';
import { GeojsonModule } from 'src/geojson/geojson.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fazenda]),
    GeojsonModule],
  providers: [FazendasService],
  controllers: [FazendasController],
  exports: [FazendasService],
})
export class FazendasModule { }
