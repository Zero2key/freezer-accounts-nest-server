import { Test, TestingModule } from '@nestjs/testing';
import { MaterielTypesController } from './materiel-types.controller';
import { MaterielTypesService } from './materiel-types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MaterielType } from './materiel-types.entity';
import { Repository } from 'typeorm';

const mockRepository: Repository<MaterielType> = new Repository<MaterielType>();

describe('MaterielTypes Controller', () => {
  let controller: MaterielTypesController;
  let service: MaterielTypesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterielTypesController],
      providers: [
        MaterielTypesService,
        {
          provide: getRepositoryToken(MaterielType),
          useValue: mockRepository,
        },
      ],
    }).compile();
    controller = module.get<MaterielTypesController>(MaterielTypesController);
    service = module.get<MaterielTypesService>(MaterielTypesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return right object', async () => {
      const materielTypes = [
        {
          code: 'DOOR',
          label: '门',
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(() => materielTypes);
      expect(await controller.list()).toEqual({
        code: 1,
        data: materielTypes,
      });
    });
  });
});
