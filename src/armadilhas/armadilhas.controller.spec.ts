import { Test, TestingModule } from '@nestjs/testing';
import { ArmadilhasController } from './armadilhas.controller';

describe('ArmadilhasController', () => {
  let controller: ArmadilhasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmadilhasController],
    }).compile();

    controller = module.get<ArmadilhasController>(ArmadilhasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
