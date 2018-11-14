import { Controller, Get } from '@nestjs/common';
import { MaterielTypesService } from './materiel-types.service';
import { ApiUseTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { swaggerStringify } from '../utils';

@ApiUseTags('MaterielTypes 物料类型')
@Controller('materiel-types')
export class MaterielTypesController {
  constructor(private readonly materielTypesService: MaterielTypesService) {}

  /**
   * 获取物料类型列表
   */
  @ApiOperation({
    title: '物料类型列表',
    description: '订单物料所用的类型',
  })
  @ApiOkResponse({
    description: swaggerStringify({
      code: 1,
      data: [
        {
          code: 'DOOR',
          label: '门',
        },
      ],
    }),
  })
  @Get()
  async list() {
    return await this.materielTypesService.findAll();
  }
}
