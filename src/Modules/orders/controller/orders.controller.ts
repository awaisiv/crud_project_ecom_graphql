import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from '../Services/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { ValidationidPipe } from 'src/common/pipes/idvalidation.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('find')
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id',ParseIntPipe,ValidationidPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id', ParseIntPipe,ValidationidPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe,ValidationidPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
