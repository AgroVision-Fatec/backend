import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fazenda } from './fazenda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FazendasService {
  constructor(
    @InjectRepository(Fazenda)
    private fazendasRepository: Repository<Fazenda>,
  ) {}

  create(fazenda: Fazenda): Promise<Fazenda> {
    return this.fazendasRepository.save(fazenda);
  }

  findAll(): Promise<Fazenda[]> {
    return this.fazendasRepository.find();
  }

  findOne(id_fazenda: number): Promise<Fazenda> {
    return this.fazendasRepository.findOne({ where: { id_fazenda } });
  }

  async update(
    id_fazenda: number,
    fazenda: Partial<Fazenda>,
  ): Promise<Fazenda> {
    const existingFazenda = await this.fazendasRepository.findOne({
      where: {
        id_fazenda: id_fazenda,
      },
    });
    if (!existingFazenda) throw new Error('Fazenda not found');

    Object.assign(existingFazenda, fazenda);
    return this.fazendasRepository.save(existingFazenda);
  }

  async remove(id: number): Promise<void> {
    const result = await this.fazendasRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Fazenda not found');
    }
  }
}
