import { Module } from '@nestjs/common';
import { FazendasService } from './fazendas.service';
import { FazendasController } from './fazendas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fazenda } from './fazenda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fazenda])],
  providers: [FazendasService],
  controllers: [FazendasController],
})
export class FazendasModule {}
