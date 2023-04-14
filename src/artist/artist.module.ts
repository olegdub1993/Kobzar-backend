/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ArtistController } from './artist.conttroller'
import { ArtistService } from './artist.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ArtistSchema, Artist } from './schemas/artist.schema'
import { FileService } from 'src/file/file.service'


@Module({
    imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    ],
    controllers: [ArtistController],
    providers: [ArtistService,FileService]
})
export class ArtistModule { }