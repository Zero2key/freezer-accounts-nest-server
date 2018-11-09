import { Test, TestingModule } from '@nestjs/testing';
import { MaterielTypesService } from './materiel-types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MaterielType } from './materiel-types.entity';
import { Repository } from 'typeorm';

const mockRepository: Repository<MaterielType> = new Repository<MaterielType>();

describe('MaterielTypesService', () => {
  let service: MaterielTypesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaterielTypesService,
        {
          provide: getRepositoryToken(MaterielType),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<MaterielTypesService>(MaterielTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of materiel-types', async () => {
      const materielTypes = [
        {
          code: 'DOOR',
          label: '门',
        },
      ];
      jest
        .spyOn(mockRepository, 'find')
        .mockImplementation(() => materielTypes);
      expect(await service.findAll()).toBe(materielTypes);
    });
  });
});
