import { Customer } from './customers.entity';
import { ApiModelProperty } from '@nestjs/swagger';

export class CustomerDto {
  readonly id = undefined;

  @ApiModelProperty({
    description: '客户名称',
    example: 'name',
  })
  readonly name: string;

  @ApiModelProperty({
    description: '公司名称',
    example: 'cName',
  })
  readonly companyName: string;
}

export class CustomerListResp {
  @ApiModelProperty({
    example: 1,
  })
  readonly code: number;

  @ApiModelProperty({
    type: [Customer],
  })
  readonly data: Customer[];
}

export class CustomerSaveResp {
  @ApiModelProperty({
    example: 1,
  })
  readonly code: number;

  @ApiModelProperty({
    type: Customer,
  })
  readonly data: Customer;
}

export class CustomerFindByIdResp {
  @ApiModelProperty({
    example: 1,
  })
  readonly code: number;

  @ApiModelProperty({
    type: Customer,
  })
  readonly data: Customer;
}
