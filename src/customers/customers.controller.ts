import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiOperation,
  ApiOkResponse,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import {
  CustomerDto,
  CustomerListResp,
  CustomerSaveResp,
  CustomerFindByIdResp,
} from './customers.dto';
import { PageParams } from '../common/interface';
import { Page } from '../common/decorator/page.decorator';

@ApiUseTags('Customers 客户')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  /**
   * 获取客户列表
   * @param {PageParams}
   */
  @ApiOperation({
    title: '客户列表',
  })
  @ApiImplicitQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    description: '查询数量',
  })
  @ApiImplicitQuery({
    name: 'pageNo',
    type: Number,
    required: false,
    description: '页数',
  })
  @ApiOkResponse({
    type: CustomerListResp,
  })
  @Get()
  async findAll(@Page() { pageNo, pageSize }: PageParams) {
    const list = await this.customersService.findAll(pageNo, pageSize);
    return {
      list: list[0],
      page: {
        pageNo,
        pageSize,
        total: list[1],
      },
    };
  }

  /**
   * 新建客户
   * @param {CustomerDto} createCustomerDto
   */
  @ApiOperation({
    title: '新建客户',
  })
  @ApiOkResponse({
    type: CustomerSaveResp,
  })
  @Post()
  async save(@Body() createCustomerDto: CustomerDto) {
    return await this.customersService.save(createCustomerDto);
  }

  /**
   * 获取客户信息
   * @param {string} id
   */
  @ApiOperation({
    title: '获取客户信息',
  })
  @ApiOkResponse({
    type: CustomerFindByIdResp,
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.customersService.findById(id);
  }

  /**
   * 更新客户信息
   * @param {string} id
   * @param {CustomerDto} createCustomerDto
   */
  @ApiOperation({
    title: '更新客户信息',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createCustomerDto: CustomerDto,
  ) {
    await this.customersService.update(id, createCustomerDto);
    return;
  }

  /**
   * 删除客户
   * @param {string} id
   */
  @ApiOperation({
    title: '删除客户',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.customersService.delete(id);
    return;
  }
}
