import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fazenda } from './fazenda.entity';
import { CreateFazendaDto } from './dto/create-fazenda.dto';
import { UpdateFazendaDto } from './dto/update-fazenda.dto';

@Injectable()
export class FazendasService {
  constructor(
    @InjectRepository(Fazenda)
    private fazendasRepository: Repository<Fazenda>,
  ) {}

  async create(createFazendaDto: CreateFazendaDto): Promise<Fazenda> {
    const fazenda = new Fazenda();
    fazenda.nome = createFazendaDto.nome;
    fazenda.tipoCoordenada = createFazendaDto.tipoCoordenada || 'Default'; // Provide a default or use nullable in entity
    fazenda.coordenadas = createFazendaDto.coordenadas || 'Default'; // Provide a default or use nullable in entity
    return this.fazendasRepository.save(fazenda);
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
    fazenda.coordenadas = updateFazendaDto.coordenadas || fazenda.coordenadas;
    return this.fazendasRepository.save(fazenda);
  }

  async remove(id: number): Promise<void> {
    const result = await this.fazendasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Fazenda with ID ${id} not found`);
    }
  }
}
