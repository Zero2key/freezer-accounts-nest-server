import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * 物料
 */
@Entity()
export class MaterielType {
  @ApiModelProperty({
    description: '物料code',
    example: 'DOOR',
  })
  @PrimaryColumn({ length: 16 })
  code: string;

  @ApiModelProperty({
    description: '物料label',
    example: '门',
  })
  @Column({ length: 16 })
  label: string;
}
