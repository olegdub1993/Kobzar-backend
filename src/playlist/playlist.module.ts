/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.conttroller'
import { PlaylistService } from './playlist.service'
import { MongooseModule } from '@nestjs/mongoose'
import { PlaylistSchema, Playlist } from './schemas/playlist.schema'
import { FileService } from 'src/file/file.service'
import { User } from 'src/users/schemas/user.schema';
import { UserSchema } from '../users/schemas/user.schema';

@Module({
    imports: [
    MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [PlaylistController],
    providers: [PlaylistService, FileService]
})
export class PlaylistModule { }