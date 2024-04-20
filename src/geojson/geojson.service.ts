// src/geojson/geojson.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';

@Injectable()
export class GeojsonService {
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
