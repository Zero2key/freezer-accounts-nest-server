import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterielType } from './materiel-types.entity';

@Injectable()
export class MaterielTypesService {
  constructor(
    @InjectRepository(MaterielType)
    private readonly materielTypeRepository: Repository<MaterielType>,
  ) {}

  /**
   * 查询物料列表
   */
  findAll(): Promise<MaterielType[]> {
    return this.materielTypeRepository.find();
  }
}
