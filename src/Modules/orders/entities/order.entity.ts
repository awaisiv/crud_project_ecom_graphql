import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,UpdateDateColumn } from 'typeorm';
@Entity()
export class OrderEntity {
  
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  user_id:number

  @Column({type:'float'})
  total_amount:number

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  last_updated_at:Date

}
