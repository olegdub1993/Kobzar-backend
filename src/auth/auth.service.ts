/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import RefreshToken from './schemas/refreshToken.schema';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { sign, verify } from 'jsonwebtoken';


@Injectable()
export class AuthService {
    private refreshTokens: RefreshToken[] = [];
    constructor(private readonly userService: UsersService) { }

    async login(email: string, password: string, values: { userAgent: string, ipAddress: string }): Promise<{ accessToken: string, refreshToken: string } | undefined> {
        const user = await this.userService.findByEmail(email)
        console.log("this is env", process.env.ACCESS_SECRET,)
        if (!user) { return undefined }
        if (user.password !== password) { return undefined }

        return this.newRefreshAndAccessToken(user, values)
    }
    async refresh(refreshStr: string): Promise<string | undefined> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr)
        if (!refreshToken) {
            return undefined
        }
        const user = this.userService.findOne(refreshToken.userId)
        if (!user) {
            return undefined
        }
        const accessToken = {
            userId: refreshToken.id
        }
        return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: "1h" })
    }
    private retrieveRefreshToken(refreshStr: string): Promise<RefreshToken | undefined> {
        try {
            const decoded = verify(refreshStr, process.env.REFRESH_SECRET)
            if (typeof decoded === "string") {
                return undefined
            }
            return Promise.resolve(this.refreshTokens.find((token: RefreshToken) => token.id === decoded.id))
        } catch (error) {
            return undefined
        }
    }
    private async newRefreshAndAccessToken(user: CreateUserDto, values: { userAgent: string, ipAddress: string }): Promise<{ accessToken: string, refreshToken: string }> {
        const refreshObject = new RefreshToken({ id: this.refreshTokens.length === 0 ? 0 : this.refreshTokens[this.refreshTokens.length - 1].id + 1, ...values, userId: user.id })
        this.refreshTokens.push(refreshObject)
        return {
            refreshToken: refreshObject.sign(),
            accessToken: sign({ userId: user.id }, process.env.ACCESS_SECRET, { expiresIn: "1h" }),
        }
    }
    async logout(refreshStr): Promise<void> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr)
        if (!refreshToken) {
            return
        }
        //delete refreshToken from db
        this.refreshTokens = this.refreshTokens.filter((refreshTok) => refreshTok.id !== refreshToken.id)
    }
}