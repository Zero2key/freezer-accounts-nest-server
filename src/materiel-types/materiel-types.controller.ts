import { Controller, Get } from '@nestjs/common';
import { MaterielTypesService } from './materiel-types.service';
import { ApiUseTags, ApiOkResponse } from '@nestjs/swagger';
import { swaggerStringify } from '@/utils';

@ApiUseTags('MaterielTypes')
@Controller('materiel-types')
export class MaterielTypesController {
  constructor(private readonly materielTypesService: MaterielTypesService) {}

  @Get()
  @ApiOkResponse({
    description: swaggerStringify({
      code: 1,
      data: [
        {
          code: 'DOOR',
          label: '门',
        },
        {
          code: 'BOARD',
          label: '板',
        },
        {
          code: 'PARTS',
          label: '配件',
        },
      ],
    }),
  })
  async list() {
    return {
      code: 1,
      data: await this.materielTypesService.findAll(),
    };
  }
}
