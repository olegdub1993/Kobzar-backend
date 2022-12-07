/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AlbomController } from './albom.conttroller'
import { AlbomService } from './albom.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AlbomSchema, Albom } from './schemas/albom.schema'
import { FileService } from 'src/file/file.service'
import { User } from 'src/users/schemas/user.schema';
import { UserSchema } from './../users/schemas/user.schema';
@Module({
    imports: [
    MongooseModule.forFeature([{ name: Albom.name, schema: AlbomSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [AlbomController],
    providers: [AlbomService, FileService]
})
export class AlbomModule { }