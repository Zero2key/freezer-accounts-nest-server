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

  async findAll(): Promise<MaterielType[]> {
    return await this.materielTypeRepository.find();
  }
}
