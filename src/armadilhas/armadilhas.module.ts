import { Module } from '@nestjs/common';
import { ArmadilhasService } from './armadilhas.service';
import { ArmadilhasController } from './armadilhas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Armadilha } from './armadilhas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Armadilha])],
  providers: [ArmadilhasService],
  controllers: [ArmadilhasController],
})
export class ArmadilhasModule {}
