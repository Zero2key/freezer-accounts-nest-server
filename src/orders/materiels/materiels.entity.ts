import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Order } from '../orders.entity';

@Entity()
export class Materiel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Order, order => order.materiels)
  order?: Pick<Order, 'id'>;

  @Column({ length: 16 })
  type: string;

  @Column('int')
  quantity: number;

  @Column('float')
  unitPrice: number;

  @Column('float')
  totalPrice: number;

  @Column()
  remark: string;
}
