import { Resolver, Query, Mutation, Args, Int, Context, GqlExecutionContext } from '@nestjs/graphql';
import { OrdersService } from '../Services/orders.service';
import { Order } from '../models/orders.model';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { Permissions } from 'src/common/decorators/Permissions.decorator';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { ForbiddenException } from '@nestjs/common';
@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) { }

  @Roles(1, 2, 3)
  @Permissions('create_order')
  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Roles(2, 3)
  @Permissions('find_all_order')
  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Roles(1)
  @Permissions('find_all_own_orders')
  @Query(() => [Order], { name: 'customer_orders' })
  findAllOrdersOfUser(@Context() context: any) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const user = ctx.req.user as { user_id: number }; // make sure this matches your JWT payload
    const UserId = user?.user_id;
    if (!UserId) throw new ForbiddenException('No user found in context');
    return this.ordersService.findActiveOrdersofUser(UserId);
  }

  @Roles(2, 3)
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
