import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fazenda } from './fazenda.entity';
import { UpdateFazendaDto } from './dto/update-fazenda.dto';
// import * as fs from 'fs'
import { GeojsonService } from 'src/geojson/geojson.service';

@Injectable()
export class FazendasService {

  constructor(
    @InjectRepository(Fazenda)
    private fazendasRepository: Repository<Fazenda>,
    private readonly geojsonService: GeojsonService,
  ) {}

  async createFromGeoJSON(salvo: any): Promise<Fazenda[]> {
    if (!salvo || !salvo.features) {
      throw new Error('Invalid GeoJSON data.');
    }

    const fazendas: Fazenda[] = salvo.features.map(feature => {
      const { FAZENDA: nome } = feature.properties;
      const tipoCoordenada = 'MultiPolygon';
      const coordenadas = JSON.stringify(feature.geometry.coordinates);

      const fazenda = new Fazenda();
      fazenda.nome = nome;
      fazenda.tipoCoordenada = tipoCoordenada;
      // fazenda.coordenadas = coordenadas;
      
      return fazenda;
    });

    return this.fazendasRepository.save(fazendas);
  } 

  async findAll(): Promise<Fazenda[]> {
    return this.fazendasRepository.find();
  }

  async findOne(id: number): Promise<Fazenda> {
    const fazenda = await this.fazendasRepository.findOne({
      where: { id_fazenda: id },
    });
    if (!fazenda) {
      throw new NotFoundException(`Fazenda with ID ${id} not found`);
    }
    return fazenda;
  }

  async update(
    id: number,
    updateFazendaDto: UpdateFazendaDto,
  ): Promise<Fazenda> {
    const fazenda = await this.findOne(id); // Reuse findOne to handle NotFoundException
    fazenda.nome = updateFazendaDto.nome || fazenda.nome;
    fazenda.tipoCoordenada =
      updateFazendaDto.tipoCoordenada || fazenda.tipoCoordenada;
    return this.fazendasRepository.save(fazenda);
  }

  async remove(id: number): Promise<void> {
    const result = await this.fazendasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Fazenda with ID ${id} not found`);
    }
  }
}
