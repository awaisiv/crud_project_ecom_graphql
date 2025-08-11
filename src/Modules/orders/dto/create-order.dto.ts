// import {z} from "zod"

import { IsDate, IsInt, IsString } from "class-validator";



// export const CreateOrderScehma= z.object({
//     id:z.number(),
//     customer_id:z.number(),
//     order_date:z.date(),
//     status:z.string(),
//     total_amount:z.number().nonnegative()

// })
// export type CreateOrderdto=z.infer<typeof CreateOrderScehma>
export class CreateOrderDto {
    @IsInt()
    id:number;
    @IsInt() 
    customer_id:number;
    @IsDate() 
    order_date:Date;
    @IsString() 
    status:string;
    @IsInt() 
    total_amount:number;
}
