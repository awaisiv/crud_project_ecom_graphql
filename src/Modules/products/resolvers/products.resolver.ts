import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from '../services/products.service';
import { ProductModel } from '../models/product.model';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Permissions } from 'src/common/decorators/Permissions.decorator';
import { Roles } from 'src/common/decorators/Roles.decorator';

Roles(1)
@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }
  @Permissions('create_product')
  @Mutation(() => ProductModel)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Permissions('view_products')
  @Query(() => [ProductModel], { name: 'products_get_all' })
  findAll() {
    return this.productsService.findAll();
  }

  @Permissions('view_product')
  @Query(() => ProductModel, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Permissions('update_product')
  @Mutation(() => ProductModel)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Permissions('remove_product')
  @Mutation(() => ProductModel)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
