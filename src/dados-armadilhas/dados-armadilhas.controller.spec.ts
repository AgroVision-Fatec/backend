import { Test, TestingModule } from '@nestjs/testing';
import { DadosArmadilhasController } from './dados-armadilhas.controller';

describe('DadosArmadilhasController', () => {
  let controller: DadosArmadilhasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DadosArmadilhasController],
    }).compile();

    controller = module.get<DadosArmadilhasController>(DadosArmadilhasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
