/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private users: CreateUserDto[] = [
        {
            id: 0,
            name: "bob",
            email: "bob@gmail.com",
            password: "bobPass"
        },
        {
            id: 1,
            name: "bob2",
            email: "bob2@gmail.com",
            password: "bobPass2"
        },
    ]
    async findByEmail(email: string): Promise<CreateUserDto | undefined> {
        const user = this.users.find((user) => user.email === email)
        if (user) { return Promise.resolve(user) }
        return undefined
    }
    async findOne(id: number): Promise<CreateUserDto | undefined> {
        const user = this.users.find((user) => user.id === id)
        if (user) { return Promise.resolve(user) }
        return undefined
    }
}
