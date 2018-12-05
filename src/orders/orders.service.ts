import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Order } from './orders.entity';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
import { Materiel } from './materiels/materiels.entity';
import {
  CreateMaterielDto,
  UpdateMaterielDto,
} from './materiels/materiels.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Materiel)
    private readonly materielRepository: Repository<Materiel>,
  ) {}

  findAll(page: number, take: number) {
    return this.orderRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    });
  }

  findById(id: string) {
    return getManager().transaction(async entityManger => {
      return {
        order: await entityManger.findOne(Order, id),
        materiels: await entityManger.find(Materiel, {
          order: {
            id,
          },
        }),
      };
    });
  }

  delete(id: string) {
    return getManager().transaction(async entityManger => {
      await entityManger.delete(Order, id);
      await entityManger.delete(Materiel, {
        order: {
          id,
        },
      });
    });
  }

  save(
    customerId: string,
    orderDto: CreateOrderDto,
    materielsDto: CreateMaterielDto[],
  ) {
    return getManager().transaction(async entityManger => {
      orderDto.customer = { id: customerId };
      const order = await entityManger.save(Order, orderDto);
      materielsDto.forEach(m => (m.order = { id: order.id }));
      return {
        order,
        materiels: await entityManger.save(Materiel, materielsDto),
      };
    });
  }

  update(
    customerId: string,
    orderDto: UpdateOrderDto,
    createMateriels: CreateMaterielDto[],
    updateMateriels: UpdateMaterielDto[],
    deleteMaterielIds: string[],
  ) {
    return getManager().transaction(async entityManger => {
      await entityManger.update(Order, orderDto.id, {
        ...orderDto,
        customer: {
          id: customerId,
        },
      });
      createMateriels.forEach(m => (m.order = { id: orderDto.id }));
      await entityManger.save(Materiel, createMateriels);
      await entityManger.delete(Materiel, deleteMaterielIds);
      for (const m of updateMateriels) {
        await entityManger.update(Materiel, m.id, {
          ...m,
          order: {
            id: orderDto.id,
          },
        });
      }
    });
  }
}
