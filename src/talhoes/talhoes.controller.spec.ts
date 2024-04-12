import { Test, TestingModule } from '@nestjs/testing';
import { TalhoesController } from './talhoes.controller';

describe('TalhoesController', () => {
  let controller: TalhoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalhoesController],
    }).compile();

    controller = module.get<TalhoesController>(TalhoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
