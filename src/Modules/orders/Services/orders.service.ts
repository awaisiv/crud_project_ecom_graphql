import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(OrderEntity) private readonly orderEntity: Repository<OrderEntity>) { }
  create(createOrderInput: CreateOrderInput) {
    return this.orderEntity.save(createOrderInput)
  }

  findAll() {
    return this.orderEntity.find();
  }
  findAllOrdersofUser(id: number) {
    return this.orderEntity.find(
      { where: { user_id: id } }
    )
  }
  findActiveOrdersofUser(id: number) {
    return this.orderEntity.find(
      { where: { user_id: id } }
    )
  }
  findOne(id: number) {
    return this.orderEntity.findOne({ where: { id: id } });
  }

  async update(id: number, updateOrderInput: UpdateOrderInput) {
    const product = this.orderEntity.findOneBy({ id: id });
    if (!product) return new Error('Product Not Found')
    await this.orderEntity.update(id, updateOrderInput)
    return updateOrderInput
  }

  async remove(id: number) {
    const product = await this.orderEntity.findOneBy({ id: id });
    if (!product) throw new Error('Product Not Found')
    await this.orderEntity.delete(id)
    return product;
  }
}
