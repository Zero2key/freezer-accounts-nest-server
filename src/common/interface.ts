import { ApiModelProperty } from '@nestjs/swagger';

export interface PageParams {
  readonly pageNo: number;
  readonly pageSize: number;
}

export class PageResp {
  @ApiModelProperty({
    description: '页数',
    example: 1,
  })
  readonly pageNo: number;

  @ApiModelProperty({
    description: '查询数量',
    example: 10,
  })
  readonly pageSize: number;

  @ApiModelProperty({
    description: '总数',
    example: 1,
  })
  readonly total: number;
}
