/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseInterceptors, UploadedFiles, UseGuards, Req } from '@nestjs/common';
import { PlaylistService} from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller("playlists")
export class PlaylistController {
    constructor(private albomService: PlaylistService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        ,]))
    create(@Req() request, @UploadedFiles() files, @Body() dto: CreatePlaylistDto) {
        const userId = request.user.userId
        let picture;
        if (files.picture){ picture=files.picture[0] }
        return this.albomService.create(userId, dto, picture)
    }
    @UseGuards(JwtAuthGuard)
    @Post(":id")
    addTrackToPlaylist(@Req() request, @Param("id") id: ObjectId, @Body() dto:{id:string}) {
        const userId = request.user.userId
        return this.albomService.addTrackToPlaylist(userId, id, dto.id)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        ,]))
    updatePlaylist( @UploadedFiles() files,@Body() dto:any) {
        let picture;
        if (files.picture){ picture=files.picture[0] }
        return this.albomService.updatePlaylist(dto,picture)
    }
    @UseGuards(JwtAuthGuard)
    @Put(":id")
    removeTrackFromPlaylist(@Req() request, @Param("id") id: ObjectId, @Body() dto:{id:string}) {
        const userId = request.user.userId
        return this.albomService.removeTrackFromPlaylist(userId, id, dto.id)
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
    getOne( @Param("id") id: ObjectId) {
        return this.albomService.getOne(id)
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    delete(@Req() request, @Param("id") id: ObjectId) {
        const userId = request.user.userId
        return this.albomService.delete(userId,id)
    }

}