import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private OrderRepository:Repository<Order>){}
  async create(createOrderDto: CreateOrderDto) {
    const order =  this.OrderRepository.create(createOrderDto);
    return await this.OrderRepository.save(order);
  }

  findAll() {
    return this.OrderRepository.find();
  }

  async findOne(id: number) {
    const Orders = await this.OrderRepository.find({where:{id}});
    if(!Orders)
    {
      throw new HttpException('NotFound',HttpStatus.NOT_FOUND);
    }
    return Orders;
  }

async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.OrderRepository.update({id}, updateOrderDto);
  }

  async remove(id: number) {
    await this.OrderRepository.delete({id}); 
  }
}
