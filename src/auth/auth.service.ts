/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Token, TokenDocument } from './schemas/refreshToken.schema';
import { UsersService } from './../users/users.service';
import { UserDto } from './dto/user.dto';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class AuthService {
    // private refreshTokens: RefreshToken[] = [];
    constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>,private readonly mailService: MailService,  private readonly userService: UsersService,) { }

    async registration(email: string, password: string, username:string, values: { userAgent: string, ipAddress: string }): Promise<{ accessToken: string, refreshToken: string,  user: UserDto}>{
        const canditate = await this.userService.findByEmail(email)
        if (canditate) {
            throw new HttpException(`Користувач з поштою ${email} вже існує`, 403);
        }
        const user = await this.userService.create(email, password, username)
        const userDto={ id: user._id, email: user.email, username:user.username, isActivated: user.isActivated, liked:user.liked, likedPlaylists:user.likedPlaylists,  picture:user.picture,subscriptions:user.subscriptions, subscribers:user.subscribers}
        const tokens = this.generateTokens(userDto, values)
        await this.saveToken(user.id, tokens.refreshToken)
        return {...tokens,  user:userDto}
    }

    async login(email: string, password: string, values: { userAgent: string, ipAddress: string }): Promise<{ accessToken: string, refreshToken: string,  user: UserDto}> {
        const user = await this.userService.findByEmail(email)
        if (!user) { throw new HttpException(`Неправильний пароль або логін`, 403); }
        const isPassEquals=await bcrypt.compare(password,user.password)
        if (!isPassEquals) {  throw new HttpException(`Неправильний пароль або логін`, 403);  }
        const userDto={ id: user._id, email: user.email,username:user.username, isActivated: user.isActivated, liked:user.liked, likedPlaylists:user.likedPlaylists, picture:user.picture,subscriptions:user.subscriptions, subscribers:user.subscribers}
        const tokens = this.generateTokens(userDto, values)
        await this.saveToken(user.id, tokens.refreshToken)
        return {...tokens,  user:userDto }
        // return this.newRefreshAndAccessToken(user, values)
    }
  async refresh(refreshToken:string, values: { userAgent: string, ipAddress: string }):Promise<{ accessToken: string, refreshToken: string,  user: UserDto}> {
            if (!refreshToken) {
                throw new HttpException(`Unauthorized`, 401);
            }
        const userData= this.validateRefreshToken(refreshToken)
        const tokenFromDb = await this.findToken(refreshToken)

        if (!userData||!tokenFromDb) {
            throw new HttpException(`Unauthorized`, 401);
        }
        const user = await this.userService.findOne(userData.id)
        const userDto={ id: user._id, email: user.email, username:user.username, isActivated: user.isActivated, liked:user.liked, likedPlaylists:user.likedPlaylists, picture:user.picture,subscriptions:user.subscriptions, subscribers:user.subscribers }
        const tokens = this.generateTokens(userDto, values)
        await this.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user:userDto}
    }

       validateRefreshToken(refreshStr: string):JwtPayload{
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
    generateTokens(user: UserDto, values: { userAgent: string, ipAddress: string }): { accessToken: string, refreshToken: string } {
        const accessToken = sign({ ...user, ...values }, process.env.ACCESS_SECRET, { expiresIn: "15m" })
        const refreshToken = sign({ ...user, ...values }, process.env.REFRESH_SECRET, { expiresIn: "30d" })

        return { refreshToken, accessToken }
    }

    async saveToken(userId, refreshToken):Promise<Token> {
        const tokenData = await this.tokenModel.findOne({ user: userId })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = this.tokenModel.create({ user: userId, refreshToken })
        return token
    }

        async logout(refreshToken:string): Promise<Token> {
        const token = await this.removeToken(refreshToken)
        return token
    }

    async removeToken(refreshToken:string): Promise<any> {
        const tokenData = await this.tokenModel.deleteOne({refreshToken})
         return tokenData
    }
    async findToken(refreshToken:string): Promise<Token> {
        const tokenData = await this.tokenModel.findOne({refreshToken})
        return tokenData
    }
    async sendPasswordLink(email:string): Promise<any> {
        const user = await this.userService.findByEmail(email)
        if (!user) {throw new HttpException(`Користувача з такою поштою не існує`, 403); }
        const token = sign({id:user._id }, process.env.REFRESH_SECRET, { expiresIn: "2m" })
        await this.saveToken(user.id, token)
        await this.mailService.sendActivationMail(email, `${process.env.CLIENT_URL}/forgotPassword/${user._id}/${token}`, `Зміна паролю на ${process.env.API_URL}`, "Це посилання активне лише 2 хвилини:")
        return  "Link successfully sended to email"
    }
    async validateUser(id:any, token:any): Promise<any> {
        const userData= this.validateRefreshToken(token)
        const tokenFromDb = await this.findToken(token)

        if (!userData||!tokenFromDb) {
            throw new HttpException("Посилання не дійсне", 401);
        }
        return    userData 
    }
    async changePassword(id:any, token:any, password:string): Promise<any> {
        const userData= this.validateRefreshToken(token)
        const tokenFromDb = await this.findToken(token)

        if (!userData||!tokenFromDb) {
            throw new HttpException("Токен вже непридатний, згенеруйте нове посилання", 401);
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await this.userService.findOne(id)
        user.password=hashPassword
        await user.save()
         return  {email:user.email, password}
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