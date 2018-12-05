import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PageParams } from '../common/interface';
import { Page } from '../common/decorator/page.decorator';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
import {
  CreateMaterielDto,
  UpdateMaterielDto,
} from './materiels/materiels.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(@Page() { pageNo, pageSize }: PageParams) {
    const list = await this.ordersService.findAll(pageNo, pageSize);
    return {
      list: list[0],
      page: {
        pageNo,
        pageSize,
        total: list[1],
      },
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.ordersService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.ordersService.delete(id);
  }

  @Post()
  async save(
    @Body('customerId') customerId,
    @Body('order') orderDto: CreateOrderDto,
    @Body('materiels') materiels: CreateMaterielDto[],
  ) {
    return await this.ordersService.save(customerId, orderDto, materiels);
  }

  @Put(':id')
  async update(
    @Body('customerId') customerId,
    @Body('order') orderDto: UpdateOrderDto,
    @Body('createMateriels') createMateriels: CreateMaterielDto[],
    @Body('updateMateriels') updateMateriels: UpdateMaterielDto[],
    @Body('deleteMaterielIds') deleteMaterielIds: string[],
  ) {
    await this.ordersService.update(
      customerId,
      orderDto,
      createMateriels,
      updateMateriels,
      deleteMaterielIds,
    );
    return;
  }
}
