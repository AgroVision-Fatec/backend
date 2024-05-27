import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talhao } from './talhoes.entity';
import { Repository } from 'typeorm';
import { CreateTalhaoDto } from './dto/create-talhao.dto';
import { UpdateTalhaoDto } from './dto/update-talhao.dto';
import { TalhaoDeleteResponseDto } from './dto/response-delete-talhao.dto';
import { TalhaoResponseDto } from './dto/response-talhao.dto';
import { TalhoesCoordenadasService } from 'src/talhoes-coordenadas/talhoes-coordenadas.service';
import { FazendasService } from 'src/fazendas/fazendas.service';
@Injectable()
export class TalhoesService {
  constructor(
    @InjectRepository(Talhao)
    private talhoesRepository: Repository<Talhao>,
    private talhoesCoordenadasService: TalhoesCoordenadasService,
    private fazendasService: FazendasService,
  ) {}

  async createFromGeoJSONS(geoJSON: any, fazendaId: number): Promise<Talhao[]> {
    if (!geoJSON || !geoJSON.features) {
      throw new Error('Invalid GeoJSON data.');
    }

    const talhoes: Talhao[] = [];

    for (const feature of geoJSON.features) {
      const nome = feature.properties.NAME;
      const tipoCoordenada = 'MultiPolygon';

      const talhao = new Talhao();
      talhao.nome_talhao = nome;
      talhao.tipo_coordenadas = tipoCoordenada;

      const fazenda = await this.fazendasService.findByFazendaId(fazendaId);

      if (!fazenda) {
        throw new Error(`Fazenda com ID 1 não encontrada.`);
      }
      talhao.fazenda = fazenda;

      await this.talhoesRepository.save(talhao);
      talhoes.push(talhao);
    }

    for (const talhao of talhoes) {
      const feature = geoJSON.features.find(
        (f) => f.properties.NAME === talhao.nome_talhao,
      );
      if (feature) {
        const coords = feature.geometry.coordinates[0][0];
        await this.talhoesCoordenadasService.create(coords, talhao);
      }
    }

    return talhoes;
  }

  async create(createTalhaoDto: CreateTalhaoDto): Promise<TalhaoResponseDto> {
    const fazenda = await this.fazendasService.findOneByIdFazenda(
      createTalhaoDto.id_fazenda,
    );

    if (!fazenda) {
      throw new NotFoundException(
        `Fazenda com ID ${createTalhaoDto.id_fazenda} não encontrada.`,
      );
    }

    const talhao = new Talhao();
    talhao.nome_talhao = createTalhaoDto.nome_talhao;
    talhao.tipo_coordenadas = createTalhaoDto.tipo_coordenadas;
    talhao.fazenda = fazenda;

    const savedTalhao = await this.talhoesRepository.save(talhao);
    return this.mapToResponseDto(savedTalhao);
  }

  async findAll(): Promise<TalhaoResponseDto[]> {
    const talhoes = await this.talhoesRepository.find({
      relations: ['fazenda'],
    });
    return talhoes.map((talhao) => this.mapToResponseDto(talhao));
  }

  async findOne(id: number): Promise<TalhaoResponseDto> {
    const talhao = await this.talhoesRepository.findOne({
      where: { id_talhao: id },
      relations: ['fazenda'],
    });
    if (!talhao) {
      throw new NotFoundException(`Talhão com ID ${id} não encontrado.`);
    }
    return this.mapToResponseDto(talhao);
  }

  async update(
    id: number,
    updateTalhaoDto: UpdateTalhaoDto,
  ): Promise<TalhaoResponseDto> {
    const talhao = await this.talhoesRepository.preload({
      id_talhao: id,
      ...updateTalhaoDto,
    });

    if (!talhao) {
      throw new NotFoundException(`Talhão com ID ${id} não encontrado.`);
    }

    const updatedTalhao = await this.talhoesRepository.save(talhao);
    return this.mapToResponseDto(updatedTalhao);
  }

  async remove(id: number): Promise<TalhaoDeleteResponseDto> {
    const result = await this.talhoesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Talhão com ID ${id} não encontrado.`);
    }
    return { message: 'Talhão deletado com sucesso.' };
  }
  public mapToResponseDto(talhao: Talhao): TalhaoResponseDto {
    return {
      id_talhao: talhao.id_talhao,
      nome_talhao: talhao.nome_talhao,
      tipo_coordenada: talhao.tipo_coordenadas,
      id_fazenda: talhao.fazenda.id_fazenda,
    };
  }

  async FindByIdFazenda(idFazenda: number): Promise<Talhao[]> {
    const talhoes = await this.talhoesRepository.find({
      where: { fazenda: { id_fazenda: idFazenda } },
      relations: ['fazenda'],
    });
    return talhoes;
  }
}
