/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ArtistController } from './artist.conttroller'
import { ArtistService } from './artist.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ArtistSchema, Artist } from './schemas/artist.schema'
import { FileService } from 'src/file/file.service'
import { User, UserSchema } from 'src/users/schemas/user.schema';


@Module({
    imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [ArtistController],
    providers: [ArtistService,FileService]
})
export class ArtistModule { }