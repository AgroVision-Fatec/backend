import { Test, TestingModule } from '@nestjs/testing';
import { DadosArmadilhasService } from './dados-armadilhas.service';

describe('DadosArmadilhasService', () => {
  let service: DadosArmadilhasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DadosArmadilhasService],
    }).compile();

    service = module.get<DadosArmadilhasService>(DadosArmadilhasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
