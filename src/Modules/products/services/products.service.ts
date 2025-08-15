import { Injectable } from '@nestjs/common';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductEntity) private readonly productEntity:Repository<ProductEntity>){}
  create(createProductInput: CreateProductInput) {
    return this.productEntity.save(createProductInput)
  }

  findAll() {
    return this.productEntity.find();
  }

  findOne(id: number) {
    return this.productEntity.findOne({where:{id:id}});
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    const product = this.productEntity.findOneBy({id:id});
    if(!product) return new Error('Product Not Found')
    await this.productEntity.update(id,updateProductInput)
    return updateProductInput
  }

  async remove(id: number) {
    const product = await this.productEntity.findOneBy({id:id});
    if(!product) throw new Error('Product Not Found')
    await this.productEntity.delete(id)
    return product;
  }
}
