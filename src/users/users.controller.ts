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
  @Post("/subscribe")
  createSubscription(@Req() request, @Body() dto:{id:string}) {
      const userId = request.user.userId
      return this.usersService.createSubscription(userId, dto.id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/subscribe/:id")
  deleteSubscription(@Req() request, @Param("id") id: ObjectId) {
      const userId = request.user.userId
      return this.usersService.deleteSubscription(userId, id)
  }


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
  getUserPlaylists(@Req() request) {
      const userId = request.user.userId
      return this.usersService.getUserPlaylists(userId)
  }

  @Get(":id")
  getUser(@Param("id") id: ObjectId) {
    return this.usersService.getUser(id)
  }
  @UseGuards(JwtAuthGuard)
  @Post("/updateProfile")
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  updateProfile(@UploadedFiles() files, @Body() dto: any, @Req() request) {
    const userId = request.user.userId
    let picture;
    if (files.picture){ picture=files.picture[0] }
      return this.usersService.updateProfile(userId, dto, picture)
  }
  }
