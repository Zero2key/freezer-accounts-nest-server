import { Test, TestingModule } from '@nestjs/testing';
import { MaterielTypesService } from './materiel-types.service';

describe('MaterielTypesService', () => {
  let service: MaterielTypesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterielTypesService],
    }).compile();
    service = module.get<MaterielTypesService>(MaterielTypesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
