import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  name:string

  @Column({type:'float'})
  price:number

  @Column()
  stock:number

  @CreateDateColumn()
  created_at:Date
  
  @UpdateDateColumn()
  last_updated_at:Date

}
