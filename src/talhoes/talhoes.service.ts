import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talhao } from './talhoes.entity';
import { Repository } from 'typeorm';
import { CreateTalhaoDto } from './dto/create-talhao.dto';
import { UpdateTalhaoDto } from './dto/update-talhao.dto';
import { TalhaoDeleteResponseDto } from './dto/response-delete-talhao.dto';

@Injectable()
export class TalhoesService {
  constructor(
    @InjectRepository(Talhao)
    private talhoesRepository: Repository<Talhao>,
  ) {}

  async create(createTalhaoDto: CreateTalhaoDto): Promise<Talhao> {
    const talhao = this.talhoesRepository.create(createTalhaoDto);
    return this.talhoesRepository.save(talhao);
  }

  async findAll(): Promise<Talhao[]> {
    return this.talhoesRepository.find();
  }

  async findOne(id: number): Promise<Talhao> {
    const talhao = await this.talhoesRepository.findOne({
      where: { id_talhao: id },
    });
    if (!talhao) {
      throw new NotFoundException(`Talhão com ID ${id} não encontrado.`);
    }
    return talhao;
  }

  async update(id: number, updateTalhaoDto: UpdateTalhaoDto): Promise<Talhao> {
    const talhao = await this.talhoesRepository.preload({
      id_talhao: id,
      ...updateTalhaoDto,
    });

    if (!talhao) {
      throw new NotFoundException(`Talhão com ID ${id} não encontrado.`);
    }

    return this.talhoesRepository.save(talhao);
  }

  async remove(id: number): Promise<TalhaoDeleteResponseDto> {
    const result = await this.talhoesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Talhão com ID ${id} não encontrado.`);
    }
    return { message: 'Talhão deletado com sucesso.' };
  }
}
