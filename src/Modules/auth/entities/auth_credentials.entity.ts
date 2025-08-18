import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles.entity";

@Entity({ name: 'user_credentials' })

export class Auth_credentials {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @ManyToOne(() => Role, (role) => role.role_id, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role_id: number
}
