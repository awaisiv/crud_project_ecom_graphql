import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customer_id: number;

    @Column({ type: 'timestamp' })
    order_date: Date;

    @Column({ type: "varchar", length: 20, default: "Pending" })
    status: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_amount: number;
}