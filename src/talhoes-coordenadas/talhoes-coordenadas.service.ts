import { Injectable } from '@nestjs/common';
import { TalhoesCoordenadas } from './talhoes-coordenadas.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class TalhoesCoordenadasService {
    constructor(
        @InjectRepository(TalhoesCoordenadas)
        private talhoesCoordenadasRepository: Repository<TalhoesCoordenadas>,
      ) {}
      async create(coords: any, talhao: any): Promise<TalhoesCoordenadas[]> {
        const talhoesCoordenadasArray: TalhoesCoordenadas[] = [];
    
        for (const coord of coords) {
          const talhoesCoordenadas = new TalhoesCoordenadas();
          talhoesCoordenadas.talhao = talhao;
          talhoesCoordenadas.latitude = coord[1];
          talhoesCoordenadas.longitude = coord[0];
          await this.talhoesCoordenadasRepository.save(talhoesCoordenadas);
          talhoesCoordenadasArray.push(talhoesCoordenadas);
        }
    
        return talhoesCoordenadasArray;
      }
}
