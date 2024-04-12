// src/fazendas/fazendas.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FazendasService } from './fazendas.service';
import { CreateFazendaDto } from './dto/create-fazenda.dto';
import { UpdateFazendaDto } from './dto/update-fazenda.dto';
import { Fazenda } from './fazenda.entity';

@Controller('fazendas')
export class FazendasController {
  constructor(private readonly fazendasService: FazendasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() createFazendaDto: CreateFazendaDto): Promise<Fazenda> {
    return this.fazendasService.create(createFazendaDto);
  }

  @Get()
  async findAll(): Promise<Fazenda[]> {
    return this.fazendasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Fazenda> {
    return this.fazendasService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async update(
    @Param('id') id: number,
    @Body() updateFazendaDto: UpdateFazendaDto,
  ): Promise<Fazenda> {
    return this.fazendasService.update(id, updateFazendaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.fazendasService.remove(id);
  }
}
