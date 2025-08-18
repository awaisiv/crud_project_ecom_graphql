import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderItemEntity } from './order-items.entity';
@Entity({ name: 'orders' })
export class OrderEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];

  @Column({ type: 'float' })
  total_amount: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  last_updated_at: Date

}
