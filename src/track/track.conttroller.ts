/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller("tracks")
export class TrackController {
    constructor(private trackService: TrackService) { }
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
        ,]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const { picture, audio } = files
        return this.trackService.create(dto, picture[0], audio[0])
    }
    @Get()
    getAll(@Query("count") count: number,
        @Query("offset") offset: number) {
        return this.trackService.getAll(count, offset)
    }   
    @Get("/search")
    search(@Query("query") query: string,@Query("type") type: string) {
        //need to implement
        return this.trackService.search(query,type)
    }
    @Get(":id")
    getOne(@Param("id") id: ObjectId) {
        return this.trackService.getOne(id)
    }
    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.trackService.delete(id)
    }
    @Post("/comment")
    createComment(@Body() dto: CreateCommentDto) {
        return this.trackService.createComment(dto)
    }
    @Post("/listen/:id")
    listen(@Param("id") id: ObjectId) {
        return this.trackService.listen(id)
    }
}