import { Token, TokenDocument } from './schemas/refreshToken.schema';
import { UsersService } from './../users/users.service';
import { UserDto } from './dto/user.dto';
import { JwtPayload } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
export declare class AuthService {
    private tokenModel;
    private readonly mailService;
    private readonly userService;
    constructor(tokenModel: Model<TokenDocument>, mailService: MailService, userService: UsersService);
    registration(email: string, password: string, username: string, values: {
        userAgent: string;
        ipAddress: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: UserDto;
    }>;
    login(email: string, password: string, values: {
        userAgent: string;
        ipAddress: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: UserDto;
    }>;
    refresh(refreshToken: string, values: {
        userAgent: string;
        ipAddress: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: UserDto;
    }>;
    validateRefreshToken(refreshStr: string): JwtPayload;
    generateTokens(user: UserDto, values: {
        userAgent: string;
        ipAddress: string;
    }): {
        accessToken: string;
        refreshToken: string;
    };
    saveToken(userId: any, refreshToken: any): Promise<Token>;
    logout(refreshToken: string): Promise<Token>;
    removeToken(refreshToken: string): Promise<any>;
    findToken(refreshToken: string): Promise<Token>;
    sendPasswordLink(email: string): Promise<any>;
    validateUser(id: any, token: any): Promise<any>;
    changePassword(id: any, token: any, password: string): Promise<any>;
}
