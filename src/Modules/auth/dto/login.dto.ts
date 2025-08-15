import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MinLength } from "class-validator"

@InputType()
export class LoginDto {
    @Field()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @Field()
    @IsString()
    @MinLength(6, { message: 'Password Should be greater than 6 characters' })
    password: string
}
