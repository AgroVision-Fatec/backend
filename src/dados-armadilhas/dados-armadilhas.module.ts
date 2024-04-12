import { Module } from '@nestjs/common';
import { DadosArmadilhasService } from './dados-armadilhas.service';
import { DadosArmadilhasController } from './dados-armadilhas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DadosArmadilhas } from './dados-armadilhas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DadosArmadilhas])],
  providers: [DadosArmadilhasService],
  controllers: [DadosArmadilhasController],
})
export class DadosArmadilhasModule {}
