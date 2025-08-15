import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
    @Field(()=>Int)
    id:number
    
    @Field(()=>Int)
    user_id:number
    
    @Field()
    total_amount:number
}
