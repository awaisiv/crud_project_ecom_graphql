import { Module } from '@nestjs/common';
import { OrdersService } from './Services/orders.service';
import { OrdersResolver } from './resolvers/orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule { }
