import { Controller, Get } from '@nestjs/common';
import { MaterielTypesService } from './materiel-types.service';

@Controller('api/materiel-types')
export class MaterielTypesController {
  constructor(private readonly materielTypesService: MaterielTypesService) {}

  @Get()
  async list() {
    return {
      code: 1,
      data: await this.materielTypesService.findAll(),
    };
  }
}
