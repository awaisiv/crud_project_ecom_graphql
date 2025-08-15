import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class ProductModel {
    @Field(() => Int)
    id:number
  
    @Field()
    name:string
  
    @Field(()=>Float)
    price:number
  
    @Field(()=>Int)
    stock:number
}
