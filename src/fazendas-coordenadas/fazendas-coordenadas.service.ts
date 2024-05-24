import { Injectable } from '@nestjs/common';
import { FazendaCoordenadas } from './fazenda-coordenadas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FazendasCoordenadasService {
  constructor(
    @InjectRepository(FazendaCoordenadas)
    private fazendaCoordenadasRepository: Repository<FazendaCoordenadas>,
  ) {}

  async create(coords: any, fazenda: any): Promise<FazendaCoordenadas[]> {
    const fazendaCoordenadasArray: FazendaCoordenadas[] = [];

    for (const coord of coords) {
      const fazendaCoordenadas = new FazendaCoordenadas();
      fazendaCoordenadas.fazenda = fazenda;
      fazendaCoordenadas.latitude = coord[1];
      fazendaCoordenadas.longitude = coord[0];
      await this.fazendaCoordenadasRepository.save(fazendaCoordenadas);
      fazendaCoordenadasArray.push(fazendaCoordenadas);
    }

    return fazendaCoordenadasArray;
  }
}
