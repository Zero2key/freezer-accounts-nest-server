import { MaterielType } from './materiel-types.entity';
import { ApiResponseModelProperty } from '@nestjs/swagger';

export class MaterielTypeListResp {
  @ApiResponseModelProperty({
    type: Number,
    example: 1,
  })
  readonly code: number;

  @ApiResponseModelProperty({
    type: [MaterielType],
  })
  readonly data: MaterielType[];
}
