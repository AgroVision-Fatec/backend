import { Test, TestingModule } from '@nestjs/testing';
import { TalhoesService } from './talhoes.service';

describe('TalhoesService', () => {
  let service: TalhoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalhoesService],
    }).compile();

    service = module.get<TalhoesService>(TalhoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
