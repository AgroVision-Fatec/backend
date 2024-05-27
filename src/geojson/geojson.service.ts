// src/geojson/geojson.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Fazenda } from 'src/fazendas/fazenda.entity';
import { Talhao } from 'src/talhoes/talhoes.entity';
import * as util from 'util';

@Injectable()
export class GeojsonService {
  createFazendaCoordenadas(fazenda: Fazenda, coordenadas: string) {
    throw new Error('Method not implemented.');
  }
  createTalhoesCoordenadas(talhao: Talhao, coordenadas: string) {
    throw new Error('Method not implemented.');
  }
  private readonly readFile = util.promisify(fs.readFile);

  async readGeoJSON(filePath: string): Promise<any> {
    try {
      const data = await this.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Unable to read the file: ' + error.message);
    }
  }

  
}
