import { Test, TestingModule } from '@nestjs/testing';
import { ImagensController } from './imagens.controller';

describe('ImagensController', () => {
  let controller: ImagensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagensController],
    }).compile();

    controller = module.get<ImagensController>(ImagensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
