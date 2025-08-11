import { PrimaryColumn, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}
