import { Injectable } from '@nestjs/common';
import { FazendaCoordenadas } from './fazenda-coordenadas.entity';

@Injectable()
export class FazendasCoordenadasService {
    async create(coords: any): Promise<FazendaCoordenadas[]> {
        for (const coord of coords) {
            const fazendaCoordenadas = new FazendaCoordenadas();
            fazendaCoordenadas.fazenda = fazenda;
            fazendaCoordenadas.latitude = coord[1];
            fazendaCoordenadas.longitude = coord[0];
            this.fazendaCoordenadasRepository.save(fazendaCoordenadas);
          }
    }
}
