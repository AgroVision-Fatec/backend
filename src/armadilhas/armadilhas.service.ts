import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Armadilha } from './armadilhas.entity';
import { CreateArmadilhaDto } from './dto/create-armadilhas.dto';
import { UpdateArmadilhaDto } from './dto/update-armadilha.dto';
import { ArmadilhaDeleteResponseDto } from './dto/response-delete-armadilha.dto';
import { DadosArmadilhaResponseDto } from 'src/dados-armadilhas/dto/response-dados-armadilhas.dto';

@Injectable()
export class ArmadilhasService {
  mapToResponseDto: any;
  constructor(
    @InjectRepository(Armadilha)
    private armadilhasRepository: Repository<Armadilha>,
  ) {}

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

  async update(
    id: number,
    updateArmadilhaDto: UpdateArmadilhaDto,
  ): Promise<DadosArmadilhaResponseDto> {
    const armadilha = await this.armadilhasRepository.preload({
      id_armadilha: id,
      ...updateArmadilhaDto,
    });
    if (!armadilha) {
      throw new NotFoundException(`Armadilha com ID ${id} não encontrada.`);
    }
    const updatedArmadilha = await this.armadilhasRepository.save(armadilha);
    return this.mapToResponseDto(updatedArmadilha); 
  }

  async remove(id: number): Promise<ArmadilhaDeleteResponseDto> {
    const result = await this.armadilhasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Armadilha com ID ${id} não encontrada.`);
    }
    return { message: 'Armadilha deletada com sucesso.' };
  }
}
