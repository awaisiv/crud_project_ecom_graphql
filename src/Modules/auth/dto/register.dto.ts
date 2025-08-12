import { Type } from "class-transformer";
import { Column } from "typeorm";

enum gender_choice {
    male = 'male',
    female = 'female',
    other = 'other',
}

export class RegisterDto {
    name: string;
    email: string
    password: string
    role_id: number
    @Column({ type: 'enum', enum: gender_choice })
    gender: gender_choice
    @Type(() => Date)
    date_of_birth: Date;
    phone_number: number
}
