/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Token, TokenDocument } from './schemas/refreshToken.schema';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { sign, verify } from 'jsonwebtoken';
import { HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    // private refreshTokens: RefreshToken[] = [];
    constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>, private readonly userService: UsersService,) { }

    async registration(email: string, password: string, username:string, values: { userAgent: string, ipAddress: string }) {
        const canditate = await this.userService.findByEmail(email)
        if (canditate) {
            throw new HttpException(`User with ${email} already exist`, 403);
        }
        const user = await this.userService.create(email, password, username)
        const userDto={ id: user._id, email: user.email,username:user.username, isActivated: user.isActivated, liked:user.liked}
        const tokens = this.generateTokens(userDto, values)
        await this.saveToken(user.id, tokens.refreshToken)
        return {...tokens,  user:userDto}
    }

    async login(email: string, password: string, values: { userAgent: string, ipAddress: string }): Promise<{ accessToken: string, refreshToken: string,  user:any} | undefined> {
        const user = await this.userService.findByEmail(email)
        if (!user) {        throw new HttpException(`Неправильний пароль або логін`, 403); }
        const isPassEquals=await bcrypt.compare(password,user.password)
        if (!isPassEquals) {  throw new HttpException(`Неправильний пароль або логін`, 403);  }
        const userDto={ id: user._id, email: user.email,username:user.username, isActivated: user.isActivated, liked:user.liked, picture:user.picture}
        const tokens = this.generateTokens(userDto, values)
        await this.saveToken(user.id, tokens.refreshToken)
        return {...tokens,  user:userDto }
        // return this.newRefreshAndAccessToken(user, values)
    }
  async refresh(refreshToken,values): Promise<any | undefined> {
            if (!refreshToken) {
                throw new HttpException(`Unauthorized`, 401);
            }
        const userData= this.validateRefreshToken(refreshToken)
        const tokenFromDb = await this.findToken(refreshToken)

        if (!userData||!tokenFromDb) {
            throw new HttpException(`Unauthorized`, 401);
        }
        const user = await this.userService.findOne(userData.id)
        const userDto={ id: user._id, email: user.email, username:user.username, isActivated: user.isActivated, liked:user.liked, picture:user.picture }
        const tokens = this.generateTokens(userDto, values)
        await this.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user:userDto}
    }

       validateRefreshToken(refreshStr: string):any {
        try {
            const decodedUserData = verify(refreshStr, process.env.REFRESH_SECRET)
            if (typeof decodedUserData === "string") {
                return undefined
            }
            return decodedUserData
        } catch (error) {
            return null
        }
    }
    // async refresh(refreshStr: string): Promise<string | undefined> {
    //     const refreshToken = await this.retrieveRefreshToken(refreshStr)
    //     if (!refreshToken) {
    //         return undefined
    //     }
    //     const user = this.userService.findOne(refreshToken.userId)
    //     if (!user) {
    //         return undefined
    //     }
    //     const accessToken = {
    //         userId: refreshToken.id
    //     }
    //     return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: "1h" })
    // }
    // private retrieveRefreshToken(refreshStr: string): Promise<RefreshToken | undefined> {
    //     try {
    //         const decoded = verify(refreshStr, process.env.REFRESH_SECRET)
    //         if (typeof decoded === "string") {
    //             return undefined
    //         }
    //         return Promise.resolve(this.refreshTokens.find((token: RefreshToken) => token.id === decoded.id))
    //     } catch (error) {
    //         return undefined
    //     }
    // }
    generateTokens(user: any, values: { userAgent: string, ipAddress: string }): { accessToken: string, refreshToken: string } {
        const accessToken = sign({ ...user, ...values }, process.env.ACCESS_SECRET, { expiresIn: "15m" })
        const refreshToken = sign({ ...user, ...values }, process.env.REFRESH_SECRET, { expiresIn: "30d" })

        return { refreshToken, accessToken }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await this.tokenModel.findOne({ user: userId })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = this.tokenModel.create({ user: userId, refreshToken })
        return token
    }

        async logout(refreshToken): Promise<void> {
        const token = await this.removeToken(refreshToken)
         return  token
    }
    async removeToken(refreshToken): Promise<any> {
        const tokenData = await this.tokenModel.deleteOne({refreshToken})
         return tokenData
    }
    async findToken(refreshToken): Promise<any> {
        const tokenData = await this.tokenModel.findOne({refreshToken})
         return tokenData
    }
    // async logout(refreshStr): Promise<void> {
    //     const refreshToken = await this.retrieveRefreshToken(refreshStr)
    //     if (!refreshToken) {
    //         return
    //     }
    //     //delete refreshToken from db
    //     this.refreshTokens = this.refreshTokens.filter((refreshTok) => refreshTok.id !== refreshToken.id)
    // }
    // private async newRefreshAndAccessToken(user: any, values: { userAgent: string, ipAddress: string }): Promise<{ accessToken: string, refreshToken: string }> {
    //     const refreshObject = new RefreshToken({ id: this.refreshTokens.length === 0 ? 0 : this.refreshTokens[this.refreshTokens.length - 1].id + 1, ...values, userId: user._id })
    //     this.refreshTokens.push(refreshObject)
    //     return {
    //         refreshToken: refreshObject.sign(),
    //         accessToken: sign({ userId: user._id }, process.env.ACCESS_SECRET, { expiresIn: "1h" }),
    //     }
    // }
}