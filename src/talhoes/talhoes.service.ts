import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talhao } from './talhoes.entity';
import { Repository } from 'typeorm';
import { CreateTalhaoDto } from './dto/create-talhao.dto';
import { UpdateTalhaoDto } from './dto/update-talhao.dto';
import { TalhaoDeleteResponseDto } from './dto/response-delete-talhao.dto';
import { TalhaoResponseDto } from './dto/response-talhao.dto'; // Importe o DTO de resposta

@Injectable()
export class TalhoesService {
  constructor(
    @InjectRepository(Talhao)
    private talhoesRepository: Repository<Talhao>,
  ) {}

  async create(createTalhaoDto: CreateTalhaoDto): Promise<TalhaoResponseDto> {
    const talhao = this.talhoesRepository.create(createTalhaoDto);
    const savedTalhao = await this.talhoesRepository.save(talhao);
    return this.mapToResponseDto(savedTalhao);
  }

  async findAll(): Promise<TalhaoResponseDto[]> {
    const talhoes = await this.talhoesRepository.find({
      relations: ['fazenda'],
    });
    return talhoes.map(talhao => this.mapToResponseDto(talhao));
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

  async update(id: number, updateTalhaoDto: UpdateTalhaoDto): Promise<TalhaoResponseDto> {
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
  private mapToResponseDto(talhao: Talhao): TalhaoResponseDto {
    return {
      id_talhao: talhao.id_talhao,
      nome_talhao: talhao.nome_talhao,
      tipo_coordenada: talhao.tipo_coordenadas,
      id_fazenda: talhao.fazenda.id_fazenda, 
    };
  }
}
