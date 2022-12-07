/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards, Req, Post, Body, Delete, Param , UseInterceptors, UploadedFiles} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ObjectId } from 'mongoose';
import { AlbomService } from './../albom/albom.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  // @UseGuards(JwtAuthGuard)
  // @Get("/me")
  // me(@Req() request) {
  //   const userId = request.user.userId
  //   return this.usersService.findOne(userId)
  // }
  @UseGuards(JwtAuthGuard)
  @Post("/liked")
  addToLiked(@Req() request, @Body() dto:{id:string}) {
      const userId = request.user.userId
      return this.usersService.addToLiked(userId, dto.id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/liked/:id")
  removeFromLiked(@Req() request, @Param("id") id: ObjectId) {
      const userId = request.user.userId
      return this.usersService.removeFromLiked(userId, id)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/liked")
  getLiked(@Req() request) {
      const userId = request.user.userId
      return this.usersService.getLiked(userId)
  }
  
  @UseGuards(JwtAuthGuard)
  @Get("/alboms")
  getUserAlboms(@Req() request) {
      const userId = request.user.userId
      return this.usersService.getUserAlboms(userId)
  }
  @UseGuards(JwtAuthGuard)
  @Post("/updateProfile")
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  updateProfile(@UploadedFiles() files, @Body() dto: any, @Req() request) {
    const userId = request.user.userId
      const { picture } = files
      return this.usersService.updateProfile(userId, dto, picture[0])
  }
  }
