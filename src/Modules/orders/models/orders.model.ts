import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Order{
    @Field(()=>Int)
    id:number
    
    @Field(()=>Int)
    user_id:number
    
    @Field()
    total_amount:number
    

}