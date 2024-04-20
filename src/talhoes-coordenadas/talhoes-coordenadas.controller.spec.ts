import { Test, TestingModule } from '@nestjs/testing';
import { TalhoesCoordenadasController } from './talhoes-coordenadas.controller';

describe('TalhoesCoordenadasController', () => {
  let controller: TalhoesCoordenadasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalhoesCoordenadasController],
    }).compile();

    controller = module.get<TalhoesCoordenadasController>(TalhoesCoordenadasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
