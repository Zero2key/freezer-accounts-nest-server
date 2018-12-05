import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from '../customers/customers.entity';
import { Materiel } from './materiels/materiels.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @ApiModelProperty({
    description: 'id',
    example: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Customer, customer => customer.orders)
  customer?: Pick<Customer, 'id'>;

  @ApiModelProperty({
    description: '是否已收款',
    example: true,
  })
  @Column({ type: 'boolean' })
  received: boolean;

  @ApiModelProperty({
    description: '总货款',
    example: 10000,
  })
  @Column({ type: 'float' })
  payment: number;

  @ApiModelProperty({
    description: '订单日期',
  })
  @Column({ type: 'datetime' })
  orderTime: Date;

  @ApiModelProperty({
    description: '地址',
    example: '省市区',
  })
  @Column({ length: 32 })
  address: string;

  @ApiModelProperty({
    description: '详细地址',
    example: '街小区',
  })
  @Column()
  addressDetail: string;

  @OneToMany(type => Materiel, materiel => materiel.order)
  materiels?: Pick<Materiel, 'id'>[];
}
