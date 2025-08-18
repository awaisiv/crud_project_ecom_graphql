// order-item.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/Modules/products/entities/product.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrderEntity, (order) => order.items)
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column()
    quantity: number;

    @Column({ type: 'float' })
    price: number; // price at the time of purchase

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    last_updated_at: Date
}
