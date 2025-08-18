import { Field, InputType, Int } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

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

    @Field(() => Int)
    role_id: number;

    @Field()
    gender: gender_choice;

    @Field()
    date_of_birth: Date;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    @Transform(({ value }) => value.replace(/\D/g, ''))
    @Field()
    phone_number: string;
}
