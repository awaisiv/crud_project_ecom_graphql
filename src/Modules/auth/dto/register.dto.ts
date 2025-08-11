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
    gender: gender_choice
    date_of_birth: Date
    phone_number: number
}
