/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "class-validator"
export class CreateRegistrationDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    username: string
}