/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PlaylistModule } from './playlist/playlist.module';
import * as  path from 'path';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),
        // MongooseModule.forRoot('mongodb://localhost:27017/'),
        // MongooseModule.forRoot('mongodb://mongodb:27017'),
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.aqmxgwp.mongodb.net/?retryWrites=true&w=majority'),
        TrackModule, FileModule, AuthModule, UsersModule, PlaylistModule]
    // controllers: [AppContr],
})
export class AppModule { }