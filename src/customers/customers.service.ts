import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customers.entity';
import { CustomerDto } from './customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  /**
   * 分页查询
   * @param page 页数
   * @param take 分页参数
   */
  findAll(page: number, take: number): Promise<[Customer[], number]> {
    return this.customerRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    });
  }

  /**
   * 按id查询
   * @param id id
   */
  findById(id: string): Promise<Customer | undefined> {
    return this.customerRepository.findOne(id);
  }

  /**
   * 新建客户
   * @param CustomerDto 新建客户Dto
   */
  save(createCustomerDto: CustomerDto): Promise<Customer> {
    return this.customerRepository.save(createCustomerDto);
  }

  /**
   * 更新客户
   * @param id 客户id
   * @param updateCustomerDto 更新客户Dto
   */
  update(id: string, updateCustomerDto: CustomerDto) {
    return this.customerRepository.update(id, updateCustomerDto);
  }

  /**
   * 删除客户
   * @param id 客户id
   */
  delete(id: string) {
    return this.customerRepository.delete(id);
  }
}
