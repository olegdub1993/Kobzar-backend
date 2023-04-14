/* eslint-disable prettier/prettier */
import { Controller, Post, Query, Get, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

@Controller("artists")
export class ArtistController {
    constructor(private artistService: ArtistService) { }
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        ,]))
    create(@UploadedFiles() files, @Body() dto: CreateArtistDto) {
        const { picture} = files
        return this.artistService.create(dto, picture[0])
    }
    @Get()
    getAll() {
        return this.artistService.getAll()
    }
    @Get(":id")
    getUser(@Param("id") id: ObjectId) {
        return this.artistService.getArtist(id)
   }  
}