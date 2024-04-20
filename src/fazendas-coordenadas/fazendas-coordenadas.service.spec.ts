import { Test, TestingModule } from '@nestjs/testing';
import { FazendasCoordenadasService } from './fazendas-coordenadas.service';

describe('FazendasCoordenadasService', () => {
  let service: FazendasCoordenadasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FazendasCoordenadasService],
    }).compile();

    service = module.get<FazendasCoordenadasService>(FazendasCoordenadasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
