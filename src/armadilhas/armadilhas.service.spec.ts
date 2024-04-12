import { Test, TestingModule } from '@nestjs/testing';
import { ArmadilhasService } from './armadilhas.service';

describe('ArmadilhasService', () => {
  let service: ArmadilhasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmadilhasService],
    }).compile();

    service = module.get<ArmadilhasService>(ArmadilhasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
