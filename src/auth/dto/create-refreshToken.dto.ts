/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator"
export class CreateRefreshTokenDto {
    @IsNotEmpty()
    refreshToken: string
}