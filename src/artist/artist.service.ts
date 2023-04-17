/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from './schemas/artist.schema';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FileService, FileType } from 'src/file/file.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';
@Injectable()
export class ArtistService {
    constructor(@InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
    async getSearchedArtists(query, transliteratedQuery) {
        const artists = await this.artistModel.find({
            name: { $regex: new RegExp(`(${query}|${transliteratedQuery})`, 'i') }
        })
        return artists
}
async createSubscription(userId: any, userId2: any,) {
    const user = await this.userModel.findById(userId)
    user.subscriptionsToArtists.push(userId2)
    await user.save()
    // const user2 = await this.artistModel.findById(userId2)
    // user2.subscribers.push(userId)
    // await user2.save()
    // return user2._id
    return userId2
}
async deleteSubscription(userId: any, userId2: any) {
    const user = await this.userModel.findById(userId)
    user.subscriptionsToArtists = user.subscriptionsToArtists.filter((subscription) => subscription.toString() !== userId2.toString())
    await user.save()
    // const user2 = await this.artistModel.findById(userId2)
    // user2.subscribers = user2.subscribers.filter((subscriber) => subscriber.toString() !== userId.toString())
    // await user2.save()
    // return user2._id
    return userId2
}
}