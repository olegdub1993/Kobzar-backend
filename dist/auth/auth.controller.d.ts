import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { CreateEmailDto } from './dto/create-email.dto';
import { UsersService } from './../users/users.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    registration(request: any, response: any, ip: string, dto: CreateRegistrationDto): Promise<any>;
    activate(link: any, res: any): Promise<any>;
    login(request: any, response: any, ip: string, dto: CreateLoginDto): Promise<any>;
    sendPasswordLink(dto: CreateEmailDto): Promise<any>;
    forgotPassword(id: any, token: any): Promise<any>;
    changePassword(id: any, token: any, dto: {
        password: string;
    }): Promise<any>;
    refreshToken(request: any, response: any, ip: string): Promise<any>;
    logout(request: any, response: any): Promise<any>;
}
