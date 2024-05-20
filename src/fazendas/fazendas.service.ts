import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fazenda } from './fazenda.entity';
import { UpdateFazendaDto } from './dto/update-fazenda.dto';
// import * as fs from 'fs'
import { GeojsonService } from 'src/geojson/geojson.service';
import { FazendaResponseDto } from './dto/response-fazenda.dto';
import { FazendaCoordenadas } from 'src/fazendas-coordenadas/fazenda-coordenadas.entity';

@Injectable()
export class FazendasService {
  constructor(
    @InjectRepository(Fazenda)
    private fazendasRepository: Repository<Fazenda>,
    private readonly geojsonService: GeojsonService,
  ) {}

  async createFromGeoJSON(userId: any, salvo: any): Promise<Fazenda[]> {
    if (!salvo || !salvo.features) {
      throw new Error('Invalid GeoJSON data.');
    }

    const fazendas: Fazenda[] = salvo.features.map((feature) => {
      const { FAZENDA: nome } = feature.properties;
      const tipoCoordenada = 'MultiPolygon';
      const coords = feature.geometry.coordinates[0][0];

      const fazenda = new Fazenda();
      fazenda.nome_fazenda = nome;
      fazenda.tipo_coordenadas = tipoCoordenada;
      fazenda.usuario = userId;

      return fazenda;
    });

    return this.fazendasRepository.save(fazendas);
  }

  async findAll(): Promise<FazendaResponseDto[]> {
    const fazendas = await this.fazendasRepository.find({
      relations: ['usuario'],
    });
    return fazendas.map((fazenda) => {
      const responseDto: FazendaResponseDto = {
        id_fazenda: fazenda.id_fazenda,
        nome_fazenda: fazenda.nome,
        tipo_Coordenadas: fazenda.tipo_coordenadas,
        id_usuario: fazenda.usuario.id_usuario,
      };
      return responseDto;
    });
  }

  async findOne(id: number): Promise<FazendaResponseDto> {
    const fazenda = await this.fazendasRepository.findOne({
      where: { id_fazenda: id },
      relations: ['usuario'],
    });
    console.log(fazenda);
    if (!fazenda) {
      throw new NotFoundException(`Fazenda with ID ${id} not found`);
    }
    const responseDto: FazendaResponseDto = {
      id_fazenda: fazenda.id_fazenda,
      nome_fazenda: fazenda.nome,
      tipo_Coordenadas: fazenda.tipo_coordenadas,
      id_usuario: fazenda?.usuario?.id_usuario ?? null,
    };
    return responseDto;
  }

  async findAllByUserId(userId: number): Promise<FazendaResponseDto[]> {
    const fazendas = await this.fazendasRepository.find({
      where: { usuario: { id_usuario: userId } },
      relations: ['usuario'],
    });

    return fazendas.map((fazenda) => ({
      id_fazenda: fazenda.id_fazenda,
      nome_fazenda: fazenda.nome_fazenda,
      tipo_Coordenadas: fazenda.tipo_coordenadas,
      id_usuario: fazenda.usuario ? fazenda.usuario.id_usuario : null,
    }));
  }

  async update(
    id: number,
    updateFazendaDto: UpdateFazendaDto,
  ): Promise<FazendaResponseDto> {
    const fazenda = await this.findOne(id);
    fazenda.nome_fazenda = updateFazendaDto.nome || fazenda.nome_fazenda;
    fazenda.tipo_Coordenadas =
      updateFazendaDto.tipoCoordenada || fazenda.tipo_Coordenadas;
    await this.fazendasRepository.save(fazenda);

    const responseDto: FazendaResponseDto = {
      id_fazenda: fazenda.id_fazenda,
      nome_fazenda: fazenda.nome_fazenda,
      tipo_Coordenadas: fazenda.tipo_Coordenadas,
      id_usuario: fazenda.id_usuario,
    };

    return responseDto;
  }
  async remove(id: number): Promise<void> {
    const result = await this.fazendasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Fazenda with ID ${id} not found`);
    }
  }
}
