import { Module } from '@nestjs/common';
import { TalhoesService } from './talhoes.service';
import { TalhoesController } from './talhoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talhao } from './talhoes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Talhao])],
  providers: [TalhoesService],
  controllers: [TalhoesController],
})
export class TalhoesModule {}
