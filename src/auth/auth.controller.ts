/* eslint-disable prettier/prettier */
import { Controller, Req, Ip, Body, Post, Param, Delete, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { CreateRefreshTokenDto } from './dto/create-refreshToken.dto';
import { CreateEmailDto } from './dto/create-email.dto';
import { UsersService } from './../users/users.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) { }

  @Post("/registration")
  async registration(@Req() request, @Res() response, @Ip() ip: string, @Body() dto: CreateRegistrationDto) {
    const userData= await this.authService.registration(dto.email, dto.password, dto.username, {
      ipAddress: ip,
      userAgent: request.headers['user-agent']
    })
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      sameSite: 'none',
      secure: true 
    });
    return response.send(userData);
  }
  @Get("/activate/:link")
  async activate(@Param("link") link, @Res() res) {
    await this.userService.activate(link)
    return res.redirect(process.env.CLIENT_URL)
  }

  @Post("/login")
 async login(@Req() request, @Res() response, @Ip() ip: string, @Body() dto: CreateLoginDto) {
  const userData= await this.authService.login(dto.email, dto.password, {
      ipAddress: ip,
      userAgent: request.headers['user-agent']
    })
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true 
    });
    return response.send(userData);
  }

  @Post("/sendPasswordLink")
  async sendPasswordLink(@Body() dto:CreateEmailDto) {
      return this.authService.sendPasswordLink(dto.email)
    }

  @Get("/forgotPassword/:id/:token")
  async forgotPassword(@Param("id") id, @Param("token") token) {
        return this.authService.validateUser(id,token)
      }
 @Post("/changePassword/:id/:token")
      async changePassword(@Param("id") id, @Param("token") token,@Body() dto:{password:string}) {
            return this.authService.changePassword(id,token,dto.password)
          }
          
 @Get("/refresh")
 async refreshToken(@Req() request, @Res() response, @Ip() ip: string,) {

    const {refreshToken}=request.cookies
    const userData= await this.authService.refresh(refreshToken,{
      ipAddress: ip,
      userAgent: request.headers['user-agent']
    })
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true 
    });
    return response.send(userData);
  }

  @Delete("/logout")
  async logout(@Req() request,@Res() response,) {
    const {refreshToken}=request.cookies
    const token=await this.authService.logout(refreshToken)
    response.clearCookie('refreshToken')
    return response.send(token);
  }
}