/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards, Query, Req, Post, Body, Delete, Param , UseInterceptors, UploadedFiles} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ObjectId } from 'mongoose';
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
  addToLiked(@Req() request, @Query("type") type: string, @Body() dto:{id:string}) {
      const userId = request.user.userId
      return this.usersService.addToLiked(userId, type, dto.id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/liked/:id")
  removeFromLiked(@Req() request, @Query("type") type: string,  @Param("id") id: ObjectId) {
      const userId = request.user.userId
      return this.usersService.removeFromLiked(userId, type, id)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/liked")
  getLiked(@Req() request, @Query("type") type: string,) {
      const userId = request.user.userId
      return this.usersService.getLiked(userId,type)
  }
  
  @UseGuards(JwtAuthGuard)
  @Get("/playlists")
  getUserAlboms(@Req() request) {
      const userId = request.user.userId
      return this.usersService.getUserPlaylists(userId)
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
