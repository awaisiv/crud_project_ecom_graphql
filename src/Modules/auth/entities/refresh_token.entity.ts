import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Auth_credentials } from "./user_details.entity";

@Entity({ name: "user_refresh_token" })
export class RefreshTokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Auth_credentials, (id) => id.user_id, { onDelete: "CASCADE" })
    @Column({ unique: true })
    user_id: number; // e.g. 'create_order', 'delete_product'

    @Column()
    refresh_token: string

    @Column({ type: 'timestamptz' })
    expires_at: Date

    @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
    created_at: Date

}
