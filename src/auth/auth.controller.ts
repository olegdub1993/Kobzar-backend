/* eslint-disable prettier/prettier */
import { Controller, Req, Ip, Body, Post, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { CreateRefreshTokenDto } from './dto/create-refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  // @Post("/registration")
  // registration(@Body() dto: CreateCommentDto) {
  //     return this.trackService.createComment(dto)
  // }
  @Post("/login")
  login(@Req() request, @Ip() ip: string, @Body() dto: CreateLoginDto) {
    return this.authService.login(dto.email, dto.password, {
      ipAddress: ip,
      userAgent: request.headers['user-agent']
    })
  }
  @Post("/refresh")
  refreshToken(@Body() dto: CreateRefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken)
  }
  @Delete("/logout")
  logout(@Body() dto: CreateRefreshTokenDto) {
    return this.authService.logout(dto.refreshToken)
  }
}