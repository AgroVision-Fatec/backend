import { Test, TestingModule } from '@nestjs/testing';
import { TalhoesCoordenadasService } from './talhoes-coordenadas.service';

describe('TalhoesCoordenadasService', () => {
  let service: TalhoesCoordenadasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalhoesCoordenadasService],
    }).compile();

    service = module.get<TalhoesCoordenadasService>(TalhoesCoordenadasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
