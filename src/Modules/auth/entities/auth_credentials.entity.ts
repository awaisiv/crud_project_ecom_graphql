import { PrimaryColumn, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Role } from "./roles.entity";

@Entity({ name: 'User_Credentials' })

export class Auth_credentials {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    role_id: number
    @ManyToMany(() => Role, role => role.role_id)
    @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'user_id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'role_id' },
    })
    roles: Role[];
}
