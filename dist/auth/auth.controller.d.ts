import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UsersService } from './../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    registration(request: any, response: any, ip: string, dto: CreateRegistrationDto): Promise<any>;
    activate(link: any, res: any): Promise<any>;
    login(request: any, response: any, ip: string, dto: CreateLoginDto): Promise<any>;
    refreshToken(request: any, response: any, ip: string): Promise<any>;
    logout(request: any, response: any): Promise<any>;
}
