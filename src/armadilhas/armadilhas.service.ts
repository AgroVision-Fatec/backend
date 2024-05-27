import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Armadilha } from './armadilhas.entity';
import { CreateArmadilhaDto } from './dto/create-armadilhas.dto';
import { UpdateArmadilhaDto } from './dto/update-armadilha.dto';
import { ArmadilhaDeleteResponseDto } from './dto/response-delete-armadilha.dto';
import { DadosArmadilhaResponseDto } from 'src/dados-armadilhas/dto/response-dados-armadilhas.dto';
import { DadosArmadilhasService } from 'src/dados-armadilhas/dados-armadilhas.service';
import { TalhoesService } from 'src/talhoes/talhoes.service';
import { ArmadilhaResponseDto } from './dto/response-armadilha.dto';

@Injectable()
export class ArmadilhasService {
  constructor(
    @InjectRepository(Armadilha)
    private armadilhasRepository: Repository<Armadilha>,
    private armadilhaDadosService: DadosArmadilhasService,
    private talhaoService: TalhoesService,
  ) {}
  public mapToResponseDto(armadila: Armadilha): ArmadilhaResponseDto {
    return {
      id_armadilha: armadila.id_armadilha,
      tipo_coordenada: armadila.tipo_coordenada,
      latitude: armadila.latitude,
      longitude: armadila.longitude,
      talhao: armadila.talhao,
    };
  }
  async create(createArmadilhaDto: CreateArmadilhaDto): Promise<Armadilha> {
    const armadilha = this.armadilhasRepository.create(createArmadilhaDto);
    return this.armadilhasRepository.save(armadilha);
  }

  async findAll(): Promise<Armadilha[]> {
    return this.armadilhasRepository.find();
  }

  async findOne(id: number): Promise<Armadilha> {
    const armadilha = await this.armadilhasRepository.findOne({
      where: { id_armadilha: id },
    });
    if (!armadilha) {
      throw new NotFoundException(`Armadilha com ID ${id} não encontrada.`);
    }
    return armadilha;
  }

  // async update(
  //   id: number,
  //   updateArmadilhaDto: UpdateArmadilhaDto,
  // ): Promise<DadosArmadilhaResponseDto> {
  //   const armadilha = await this.armadilhasRepository.preload({
  //     id_armadilha: id,
  //     ...updateArmadilhaDto,
  //   });
  //   if (!armadilha) {
  //     throw new NotFoundException(`Armadilha com ID ${id} não encontrada.`);
  //   }
  //   const updatedArmadilha = await this.armadilhasRepository.save(armadilha);
  //   return this.mapToResponseDto(updatedArmadilha);
  // }

  async remove(id: number): Promise<ArmadilhaDeleteResponseDto> {
    const result = await this.armadilhasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Armadilha com ID ${id} não encontrada.`);
    }
    return { message: 'Armadilha deletada com sucesso.' };
  }

  async FindByIdTalhao(idTalhao: number): Promise<Armadilha[]> {
    const armadilhas = await this.armadilhasRepository.find({
      where: { talhao: { id_talhao: idTalhao } },
      relations: ['talhao'],
    });
    return armadilhas;
  }

  async createFromGeoJSONS(geoJSON: any, talhaoId: number): Promise<Armadilha[]> {
    if (!geoJSON || !geoJSON.features) {
      throw new Error('Invalid GeoJSON data.');
    }

    const armadilhas: Armadilha[] = [];

    for (const feature of geoJSON.features) {
      const armadilha = new Armadilha();
      const tipoCoordenada = 'MultiPolygon';
      armadilha.latitude = feature.geometry.coordinates[0];
      armadilha.longitude = feature.geometry.coordinates[1];
      armadilha.tipo_coordenada = tipoCoordenada;
      

      const talhao = await this.talhaoService.findbyidTalhao(
        feature.properties.id_talhao,
      );
      console.log(talhao)
      if (!talhao) {
        throw new Error(
          `Talhão com ID ${feature.properties.id_talhao} não encontrado.`,
        );
      }
      armadilha.talhao = talhao;
      await this.armadilhasRepository.save(armadilha);
      armadilhas.push(armadilha);
    }
    return armadilhas;

    // const talhao = await this.talhaoService.;

    // for (const feature of geoJSON.features) {
    //   const nome = feature.properties.NAME;
    //   const tipoCoordenada = 'MultiPolygon';

    //   const talhao = new Talhao();
    //   talhao.nome_talhao = nome;
    //   talhao.tipo_coordenadas = tipoCoordenada;

    //   const fazenda = await this.fazendasService.findByFazendaId(1);

    //   if (!fazenda) {
    //     throw new Error(`Fazenda com ID 1 não encontrada.`);
    //   }
    //   talhao.fazenda = fazenda;

    //   await this.talhoesRepository.save(talhao);
    //   talhoes.push(talhao);
    // }

    // for (const talhao of talhoes) {
    //   const feature = geoJSON.features.find(
    //     (f) => f.properties.NAME === talhao.nome_talhao,
    //   );
    //   if (feature) {
    //     const coords = feature.geometry.coordinates[0][0];
    //     await this.talhoesCoordenadasService.create(coords, talhao);
    //   }
    // }

    // return talhoes;
  }
}
