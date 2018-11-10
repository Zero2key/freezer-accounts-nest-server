import { Module } from '@nestjs/common';
import { MaterielTypesController } from './materiel-types.controller';
import { MaterielTypesService } from './materiel-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterielType } from './materiel-types.entity';

/**
 * 物料模块
 */
@Module({
  imports: [TypeOrmModule.forFeature([MaterielType])],
  controllers: [MaterielTypesController],
  providers: [MaterielTypesService],
})
export class MaterielTypesModule {}
