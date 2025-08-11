import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../entities/orders.entity";

Injectable()
export class OrderTypeormRepository
{
    constructor(@InjectRepository(Order) private readonly OrderRepository:Repository<Order>){}

    async findall():Promise<Order[]>{
        return this.OrderRepository.find();
    }

    async findone(id:number):Promise<Order |null>
    {
        return this.OrderRepository.findOne({where:{id}});
    }

    async create(order:Partial<Order>):Promise<Order>
    {
        const newOrder = this.OrderRepository.create(order);
        return this.OrderRepository.save(newOrder);
    }

    async update(id:number,order:Partial<Order>):Promise<Order|null>
    {
        await this.OrderRepository.update(id,order);
        return this.findone(id)
    }

    async delete(id:number):Promise<void>
    {
        await this.OrderRepository.delete(id)
    }
}