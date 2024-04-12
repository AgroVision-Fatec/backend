import { Test, TestingModule } from '@nestjs/testing';
import { FazendasController } from './fazendas.controller';

describe('FazendasController', () => {
  let controller: FazendasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FazendasController],
    }).compile();

    controller = module.get<FazendasController>(FazendasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
