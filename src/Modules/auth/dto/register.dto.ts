import { Field, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { Column } from "typeorm";

enum gender_choice {
    male = 'male',
    female = 'female',
    other = 'other',
}
@InputType()
export class RegisterDto {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    role_id: number;

    @Field()
    gender: gender_choice;

    @Field()
    date_of_birth: Date;

    @Field(()=>Int)
    phone_number: number;
}
