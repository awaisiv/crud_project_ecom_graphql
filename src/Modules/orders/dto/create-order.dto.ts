export class CreateOrderDto {
    id:number; 
    customer_id:number;
    order_date:Date;
    status:string;
    total_amount:number;
}
