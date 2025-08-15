import { PrimaryColumn, Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Auth_credentials } from "src/Modules/auth/entities/auth_credentials.entity";
enum gender_choice {
    male = 'male',
    female = 'female',
    other = 'other',
}
@Entity({ name: 'User_details' })
export class UserDetails {
    @PrimaryGeneratedColumn()
    customer_id: number;

    @OneToOne(() => Auth_credentials, (data) => data.user_id)
    user_id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: gender_choice })
    gender: gender_choice

    @Column()
    date_of_birth: Date

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone_number: number
}
