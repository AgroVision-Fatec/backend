
import { Module } from '@nestjs/common';
import { DadosArmadilhasService } from './dados-armadilhas.service';
import { DadosArmadilhasController } from './dados-armadilhas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DadosArmadilhas } from './dados-armadilhas.entity';
import { Armadilha } from 'src/armadilhas/armadilhas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DadosArmadilhas, Armadilha])],
  providers: [DadosArmadilhasService],
  controllers: [DadosArmadilhasController],
})
export class DadosArmadilhasModule {}
