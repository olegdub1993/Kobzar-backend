/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from './schemas/artist.schema';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FileService, FileType } from 'src/file/file.service';
@Injectable()
export class ArtistService {
    constructor(@InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
         private fileService: FileService,
         ) { }

    async create(dto: CreateArtistDto, picture,): Promise<any> {
        const [localImagePath] = await this.fileService.createFile(FileType.IMAGE, picture)
        const artist = await this.artistModel.create({ ...dto, picture: localImagePath, })
        
        return artist
    }
    async getAll(): Promise<Artist[]> {
        const artists = await this.artistModel.find()
        // tracks.forEach(async(track)=>{
        //     const duration= await getAudioDurationInSeconds(path.resolve("dist", 'static',track.audio))
        //     track.duration=duration
        //     await track.save() 
        // })
        return artists
    }
    async getArtist(id): Promise<any | undefined> {
        const artist = await this.artistModel.findById(id).populate({ 
            path: 'tracks',
            populate: {
              path: 'artists',
            } 
         })
        return artist
    }
}