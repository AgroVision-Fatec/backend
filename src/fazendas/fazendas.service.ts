import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Fazenda } from './fazenda.entity';
import { UpdateFazendaDto } from './dto/update-fazenda.dto';
// import * as fs from 'fs'
import { GeojsonService } from 'src/geojson/geojson.service';
import { FazendaResponseDto } from './dto/response-fazenda.dto';
import { FazendasCoordenadasService } from 'src/fazendas-coordenadas/fazendas-coordenadas.service';
import { FazendaALLDTO } from './dto/fazenda_allDTO';

@Injectable()
export class FazendasService {
  constructor(
    @InjectRepository(Fazenda)
    private fazendasRepository: Repository<Fazenda>,
    private readonly geojsonService: GeojsonService,
    private fazendaCoordenadasService: FazendasCoordenadasService,
    private readonly entityManager: EntityManager,
  ) {}

  async createFromGeoJSON(userId: any, salvo: any): Promise<Fazenda[]> {
    if (!salvo || !salvo.features) {
      throw new Error('Invalid GeoJSON data.');
    }

    const fazendas: Fazenda[] = [];

    for (const feature of salvo.features) {
      const { FAZENDA: nome } = feature.properties;
      const tipoCoordenada = 'MultiPolygon';

      const fazenda = new Fazenda();
      fazenda.nome_fazenda = nome;
      fazenda.tipo_coordenadas = tipoCoordenada;
      fazenda.usuario = userId;

      await this.fazendasRepository.save(fazenda);
      fazendas.push(fazenda);
    }

    // Segunda etapa: cadastrar as coordenadas para cada fazenda
    for (const fazenda of fazendas) {
      const feature = salvo.features.find(
        (f) => f.properties.FAZENDA === fazenda.nome_fazenda,
      );
      if (feature) {
        const coords = feature.geometry.coordinates[0][0];
        const fazendaCoordenadasArray =
          await this.fazendaCoordenadasService.create(coords, fazenda);
        fazenda.coordenadas = fazendaCoordenadasArray;
        await this.fazendasRepository.save(fazenda);
      }
    }

    return fazendas;
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
      relations: ['usuario','talhoes' ],
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
      talhao: fazenda.talhoes
    };
    return responseDto;
  }

  async findOneByIdFazenda(id: number): Promise<Fazenda> {
    return await this.fazendasRepository.findOne({
      where: { id_fazenda: id },
      relations: ['talhoes', 'usuario', 'coordenadas', 'tipoCoordenada'],
    });
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

  async findByFazendaId(fazendaId: number): Promise<Fazenda> {
    return await this.fazendasRepository.findOne({
      where: { id_fazenda: fazendaId },
    });
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







  async findTudo(id: number): Promise<FazendaALLDTO> {
    const fazenda = await this.fazendasRepository.findOne({
      where: { id_fazenda: id },
      relations: ['usuario', 'talhoes', 'talhoes.coordenadas'],
    });

    if (!fazenda) {
      throw new NotFoundException(`Fazenda with ID ${id} not found`);
    }

    const talhoes = fazenda.talhoes.map(talhao => ({
      id: talhao.id_talhao,
      nome: talhao.nome_talhao,
      coordenadas: talhao.coordenadas.map(coord => ({
        id: coord.id_coordenada,
        latitude: coord.latitude,
        longitude: coord.longitude,
      })),
    }));

    const responseDto: FazendaALLDTO = {
      id_fazenda: fazenda.id_fazenda,
      nome_fazenda: fazenda.nome,
      tipo_Coordenadas: fazenda.tipo_coordenadas,
      id_usuario: fazenda.usuario?.id_usuario ?? null,
      talhoes: talhoes,
    };
    
    return responseDto;
  }

}
