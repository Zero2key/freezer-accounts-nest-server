import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Materiel } from './materiels/materiels.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Materiel])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
