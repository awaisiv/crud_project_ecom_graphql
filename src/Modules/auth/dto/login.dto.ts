import { IsEmail, IsString, MinLength } from "class-validator"

export class LoginDto {
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
    @IsString()
    @MinLength(6, { message: 'Password Should be greater than 6 characters' })
    password: string
}
