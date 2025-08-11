import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderTypeormRepository } from '../repository/orders.repository';
import { Order } from '../entities/orders.entity';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';
@Injectable()
export class OrdersService {
  constructor(@Inject(ORDER_REPOSITORY) private OrderRepository:OrderTypeormRepository){}
  async create(createOrderDto: CreateOrderDto):Promise<Order> {
    return await this.OrderRepository.create(createOrderDto);
  }

  async findAll():Promise<Order[]>{
    return this.OrderRepository.findall();
  }

  async findOne(id: number):Promise<Order> {
    const Orders = await this.OrderRepository.findone(id);
    if(!Orders)
    {
      throw new HttpException('NotFound',HttpStatus.NOT_FOUND);
    }
    return Orders;
  }

async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
    return  this.OrderRepository.update(id, updateOrderDto);
  }

  async remove(id: number) {
    return this.OrderRepository.delete(id); 
  }
}
