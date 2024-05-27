import { Module, forwardRef } from '@nestjs/common';
import { ArmadilhasService } from './armadilhas.service';
import { ArmadilhasController } from './armadilhas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Armadilha } from './armadilhas.entity';
import { DadosArmadilhasModule } from 'src/dados-armadilhas/dados-armadilhas.module';
import { GeojsonModule } from 'src/geojson/geojson.module';
import { TalhoesModule } from 'src/talhoes/talhoes.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Armadilha]),
    forwardRef(() => DadosArmadilhasModule),
    forwardRef(() => GeojsonModule),
    forwardRef(() => TalhoesModule),
  ],
  providers: [ArmadilhasService],
  controllers: [ArmadilhasController],
  
})
export class ArmadilhasModule {}
