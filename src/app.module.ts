import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { datasource } from "./config/ormconfig"
import "reflect-metadata"
import { OrdersModule } from './Modules/orders/orders.module';
import { CustomersModule } from './Modules/customers/customers.module';
import { AuthModule } from './Modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(datasource.options), OrdersModule, CustomersModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }; 