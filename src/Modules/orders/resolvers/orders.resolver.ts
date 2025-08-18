import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from '../Services/orders.service';
import { Order } from '../models/orders.model';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { Permissions } from 'src/common/decorators/Permissions.decorator';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) { }

  @Permissions('create_order')
  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Permissions('find_all_order')
  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll();
  }
  
  @Permissions('find_order')
  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.findOne(id);
  }

  @Permissions('update_order')
  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Permissions('remove_order')
  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.remove(id);
  }
}
