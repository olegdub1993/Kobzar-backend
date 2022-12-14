import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailService } from './../mail/mail.service';
import { MongooseModule } from '@nestjs/mongoose'
import { User } from 'src/users/schemas/user.schema';
// import { AlbomSchema, Albom } from './../albom/schemas/albom.schema';
// import { AlbomService } from './../albom/albom.service'
import {PlaylistSchema, Playlist } from './../playlist/schemas/playlist.schema';
import { PlaylistService } from './../playlist/playlist.service'
import { UserSchema } from './schemas/user.schema';
import { FileService } from 'src/file/file.service'


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }]),],
  controllers: [UsersController],
  providers: [UsersService, MailService, FileService, PlaylistService],
  exports: [UsersService],
})
export class UsersModule { }
