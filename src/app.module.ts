import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { datasource } from "./config/ormconfig"
import { JwtAuthGuard } from './common/guards/authguard/authguard.guard';
import { RoleGuard } from './common/guards/roleguard/roleguard.guard';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './Modules/users/users.module';
import { OrdersModule } from './Modules/orders/orders.module';
import { ProductsModule } from './Modules/products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './Modules/auth/auth.module';
import { AuthResolver } from './Modules/auth/resolver/auth.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot(datasource.options)
    ,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: join(process.cwd(), 'src/Schema/schema.gql'),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    OrdersModule,
    ProductsModule,
    AuthModule,

  ],

  controllers: [AppController],
  providers: [AppService, JwtAuthGuard, RoleGuard, AuthResolver],
  exports: [JwtModule, PassportModule],
})
export class AppModule { }; 