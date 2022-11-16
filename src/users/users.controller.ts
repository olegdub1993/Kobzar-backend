import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  me(@Req() request) {
    const userId = request.user.userId
    return this.usersService.findOne(userId)
  }
}
