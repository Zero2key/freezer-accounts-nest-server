import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './customers.entity';
import { Repository } from 'typeorm';

const mockRepository: Repository<Customer> = new Repository<Customer>();

describe('CustomersService', () => {
  let service: CustomersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<CustomersService>(CustomersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array', async () => {
      const customers = [
        [
          {
            id: '1',
            name: 'test',
            companyName: 'test',
          },
        ] as Customer[],
        1,
      ];
      jest
        .spyOn(mockRepository, 'findAndCount')
        .mockImplementation(() => customers);
      expect(await service.findAll(1, 10)).toBe(customers);
    });
  });

  describe('findById', () => {
    it('should return customer', async () => {
      const customer = {
        id: '1',
        name: 'test',
        companyName: 'test',
      };
      jest.spyOn(mockRepository, 'findOne').mockImplementation(() => customer);
      expect(await service.findById('1')).toBe(customer);
    });

    it('should return undefined', async () => {
      jest.spyOn(mockRepository, 'findOne').mockImplementation(() => undefined);
      expect(await service.findById('2')).toBe(undefined);
    });
  });

  describe('save', () => {
    it('should return new customer', async () => {
      const customer = {
        id: '1',
        name: 'test',
        companyName: 'test',
      };
      jest.spyOn(mockRepository, 'save').mockImplementation(() => customer);
      expect(await service.save(customer)).toBe(customer);
    });
  });

  describe('update', () => {
    it('should no err', async () => {
      jest.spyOn(mockRepository, 'update').mockImplementation(() => undefined);
      expect(
        await service.update('1', {
          id: undefined,
          companyName: '',
          name: '',
        }),
      ).toBe(undefined);
    });
  });

  describe('delete', () => {
    it('should no err', async () => {
      jest.spyOn(mockRepository, 'delete').mockImplementation(() => undefined);
      expect(await service.delete('1')).toBe(undefined);
    });
  });
});
