import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../orders/orders.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Customer {
  @ApiModelProperty({
    description: 'id',
    example: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty({
    description: '客户名称',
    example: 'name',
  })
  @Column({ length: 16 })
  name: string;

  @ApiModelProperty({
    description: '公司名称',
    example: 'cName',
  })
  @Column({ length: 64 })
  companyName: string;

  @OneToMany(type => Order, order => order.customer)
  orders?: Pick<Order, 'id'>[];
}
