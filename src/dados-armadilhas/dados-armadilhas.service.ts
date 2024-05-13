import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DadosArmadilhas } from './dados-armadilhas.entity';
import { CreateDadosArmadilhaDto } from './dto/create-dados-armadilhas.dto';
import { UpdateDadosArmadilhaDto } from './dto/update-dados-armadilhas.dto';
import { DadosArmadilhaDeleteResponseDto } from './dto/response-delete-dados-armadilhas.dto';
import { Armadilha } from 'src/armadilhas/armadilhas.entity';

@Injectable()
export class DadosArmadilhasService {
  constructor(
    @InjectRepository(DadosArmadilhas)
    private readonly dadosArmadilhasRepository: Repository<DadosArmadilhas>,
    @InjectRepository(Armadilha)
    private armadilhasRepository: Repository<Armadilha>,
  ) {}

  async create(
    createDadosArmadilhaDto: CreateDadosArmadilhaDto,
  ): Promise<DadosArmadilhas> {
    const armadilha = await this.armadilhasRepository.findOne({
      where: { id_armadilha: createDadosArmadilhaDto.id_armadilha }
    });

    if (!armadilha) {
      throw new NotFoundException(`Armadilha com ID ${createDadosArmadilhaDto.id_armadilha} não encontrada.`);
    }


    const dadosArmadilha = this.dadosArmadilhasRepository.create({
      ...createDadosArmadilhaDto,
      armadilha: armadilha 
    });
    
    return this.dadosArmadilhasRepository.save(dadosArmadilha);
  }

  async findAll(): Promise<DadosArmadilhas[]> {
    return this.dadosArmadilhasRepository.find(
      {
        relations: ['armadilha', 'armadilha.fazenda'],
      }
    );
  }

  async findOne(id: number): Promise<DadosArmadilhas> {
    const dadosArmadilha = await this.dadosArmadilhasRepository.findOne({
      where: { id_dados_armadilha: id },
      relations: ['armadilha', 'armadilha.fazenda'],
    });
    if (!dadosArmadilha) {
      throw new NotFoundException(
        `Dados de armadilha com ID ${id} não encontrados.`,
      );
    }
    return dadosArmadilha;
  }

  async update(
    id: number,
    updateDadosArmadilhaDto: UpdateDadosArmadilhaDto,
  ): Promise<DadosArmadilhas> {
    const dadosArmadilha = await this.dadosArmadilhasRepository.preload({
      id_dados_armadilha: id,
      ...updateDadosArmadilhaDto,
    });
    if (!dadosArmadilha) {
      throw new NotFoundException(
        `Dados de armadilha com ID ${id} não encontrados.`,
      );
    }
    return this.dadosArmadilhasRepository.save(dadosArmadilha);
  }

  async remove(id: number): Promise<DadosArmadilhaDeleteResponseDto> {
    const result = await this.dadosArmadilhasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Dados de armadilha com ID ${id} não encontrados.`,
      );
    }
    return { message: 'Dados da armadilha deletados com sucesso.' };
  }
}
