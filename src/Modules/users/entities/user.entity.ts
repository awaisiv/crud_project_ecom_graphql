import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Auth_credentials } from "src/Modules/auth/entities/auth_credentials.entity";
enum gender_choice {
    male = 'male',
    female = 'female',
    other = 'other',
}
@Entity({ name: 'user_details' })
export class UserDetails {
    @PrimaryGeneratedColumn()
    customer_id: number;

    @OneToOne(() => Auth_credentials, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_id" }) // FK column in this table
    user: Auth_credentials;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: gender_choice })
    gender: gender_choice

    @Column()
    date_of_birth: Date

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone_number: string
}
