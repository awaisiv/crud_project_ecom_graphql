import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { datasource } from "./config/ormconfig"
import "reflect-metadata"
import { OrdersModule } from './Modules/orders/orders.module';
import { CustomersModule } from './Modules/customers/customers.module';
import { AuthModule } from './Modules/auth/auth.module';
import { JwtAuthGuard } from './common/guards/authguard/authguard.guard';
import { RoleGuard } from './common/guards/roleguard/roleguard.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(datasource.options), OrdersModule, CustomersModule, AuthModule
    , JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],

  controllers: [AppController],
  providers: [AppService, JwtAuthGuard, RoleGuard],
  exports: [JwtModule],
})
export class AppModule { }; 