import { Test, TestingModule } from '@nestjs/testing';
import { GeojsonService } from './geojson.service';
import { FazendasService } from 'src/fazendas/fazendas.service';

describe('GeojsonService', () => {
  let service: GeojsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeojsonService, FazendasService],
    }).compile();

    service = module.get<GeojsonService>(GeojsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
