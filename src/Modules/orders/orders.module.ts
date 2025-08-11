import { Module } from '@nestjs/common';
import { ORDER_REPOSITORY, OrdersService } from './Services/orders.service';
import { OrdersController } from './controller/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { OrderTypeormRepository } from './repository/orders.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService,
    {
      provide:ORDER_REPOSITORY,
      useClass:OrderTypeormRepository,
    },
  ]
 
})
export class OrdersModule {}
