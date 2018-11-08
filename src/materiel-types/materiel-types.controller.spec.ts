import { Test, TestingModule } from '@nestjs/testing';
import { MaterielTypesController } from './materiel-types.controller';

describe('MaterielTypes Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MaterielTypesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MaterielTypesController = module.get<
      MaterielTypesController
    >(MaterielTypesController);
    expect(controller).toBeDefined();
  });
});
