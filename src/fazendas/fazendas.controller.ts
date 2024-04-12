import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Fazenda } from './fazenda.entity';
import { FazendasService } from './fazendas.service';

@Controller('fazendas')
export class FazendasController {
  constructor(private readonly fazendasService: FazendasService) {}

  @Post()
  create(@Body() fazendaData: Fazenda) {
    return this.fazendasService.create(fazendaData);
  }

  @Get()
  findAll() {
    return this.fazendasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fazendasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() fazendaData: Partial<Fazenda>) {
    return this.fazendasService.update(id, fazendaData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fazendasService.remove(id);
  }
}
