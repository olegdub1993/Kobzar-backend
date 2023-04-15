/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TrackController } from './track.conttroller'
import { TrackService } from './track.service'
import { MongooseModule } from '@nestjs/mongoose'
import { TrackSchema, Track } from './schemas/track.schema'
import { Comment, CommentSchema } from './schemas/comment.schema'
import { FileService } from 'src/file/file.service'
import { PlaylistService } from 'src/playlist/playlist.service'
import {PlaylistSchema, Playlist } from './../playlist/schemas/playlist.schema';
import { User,UserSchema } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { MailService } from './../mail/mail.service';
import { Artist, ArtistSchema } from 'src/artist/schemas/artist.schema';
import { ArtistService } from 'src/artist/artist.service';


@Module({
    imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
        MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    ],
    controllers: [TrackController],
    providers: [TrackService, PlaylistService, UsersService, ArtistService, FileService, MailService]
})
export class TrackModule { }