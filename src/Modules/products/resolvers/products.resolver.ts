import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from '../services/products.service';
import { ProductModel } from '../models/product.model';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(()=>ProductModel)
  createProduct(@Args('createProductInput') createProductInput:CreateProductInput)
  {
     return this.productsService.create(createProductInput);
  }
  @Query(()=>[ProductModel],{name:'products_get_all'})
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => ProductModel, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => ProductModel)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => ProductModel)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
