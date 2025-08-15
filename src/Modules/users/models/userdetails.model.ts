import { Field, ObjectType } from "@nestjs/graphql";
enum gender_choice {
    male = 'male',
    female = 'female',
    other = 'other',
}
@ObjectType()
export class User {
    @Field()
    user_id: number;

    @Field()
    name: string;

    @Field()
    gender: gender_choice

    @Field()
    date_of_birth: Date

    @Field()
    email: string;

    @Field()
    phone_number: number
}
