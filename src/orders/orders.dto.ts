import { Order } from './orders.entity';

export class CreateOrderDto extends Order {
  readonly id: undefined;
}

export class UpdateOrderDto extends Order {}
