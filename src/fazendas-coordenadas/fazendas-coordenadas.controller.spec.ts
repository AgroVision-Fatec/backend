import { Test, TestingModule } from '@nestjs/testing';
import { FazendasCoordenadasController } from './fazendas-coordenadas.controller';

describe('FazendasCoordenadasController', () => {
  let controller: FazendasCoordenadasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FazendasCoordenadasController],
    }).compile();

    controller = module.get<FazendasCoordenadasController>(FazendasCoordenadasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
