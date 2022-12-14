/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseInterceptors, UploadedFiles, UseGuards, Req } from '@nestjs/common';
import { AlbomService} from './albom.service';
import { CreateAlbomDto } from './dto/create-albom.dto';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller("alboms")
export class AlbomController {
    constructor(private albomService: AlbomService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        ,]))
    create(@Req() request, @UploadedFiles() files, @Body() dto: CreateAlbomDto) {
        const userId = request.user.userId
        let picture;
        if (files.picture){ picture=files.picture[0] }
        return this.albomService.create(userId, dto, picture)
    }
    @UseGuards(JwtAuthGuard)
    @Post(":id")
    addTrackToAlbom(@Req() request, @Param("id") id: ObjectId, @Body() dto:{id:string}) {
        const userId = request.user.userId
        return this.albomService.addTrackToAlbom(userId, id, dto.id)
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    removeTrackFromAlbom(@Req() request, @Param("id") id: ObjectId, @Body() dto:{id:string}) {
        const userId = request.user.userId
        return this.albomService.removeTrackFromAlbom(userId, id, dto.id)
    }

    @Get()
    getAll(@Query("count") count: number,
        @Query("offset") offset: number) {
        return this.albomService.getAll(count, offset)
    }   
    // @Get("/search")
    // search(@Query("query") query: string) {
    //     return this.trackService.search(query)
    // }
    @Get(":id")
    getOne(@Param("id") id: ObjectId) {
        return this.albomService.getOne(id)
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.albomService.delete(id)
    }

}