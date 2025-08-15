import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsResolver } from './resolvers/products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
