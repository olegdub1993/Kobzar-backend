/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Albom, AlbomDocument } from './schemas/albom.schema';
import { CreateAlbomDto } from './dto/create-albom.dto';
import { ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AlbomService {
    constructor(@InjectModel(Albom.name) private albomModel: Model<AlbomDocument>, 
               @InjectModel(User.name) private userModel: Model<UserDocument>,
      private fileService: FileService) { }

    async create(userId, dto: CreateAlbomDto,  picture ): Promise<Albom> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const albom = await this.albomModel.create({ ...dto, picture: picturePath })
        const user = await this.userModel.findById(userId)
        user.alboms.push(albom._id)
        await user.save()
        return albom
  }
   async getOne(id: ObjectId): Promise<Albom> {
    const albom = await this.albomModel.findById(id).populate("tracks")
    return albom
   }
   async addTrackToAlbom(userId, albomId, trackId): Promise<Albom> {
    const user = await this.userModel.findById(userId)
    const albom = await this.albomModel.findById(albomId)
    albom.tracks.push(trackId)
    await albom.save()
    return albom
}
async getAll(count = 100, offset = 0): Promise<Albom[]> {
    const alboms = await this.albomModel.find().skip(offset).limit(count).populate("tracks")
    return alboms
}
    // async getOne(id: ObjectId): Promise<Track> {
    //     const track = await this.trackModel.findById(id).populate("comments")
    //     return track
    // }

    // async delete(id: ObjectId): Promise<ObjectId> {
    //     const track = await this.trackModel.findByIdAndDelete(id)
    //     return track._id
    // }
    // async createComment(dto: CreateCommentDto): Promise<Comment> {
    //     const track = await this.trackModel.findById(dto.trackId)
    //     const comment = await this.commentModel.create({ username: dto.username, text: dto.text, track: dto.trackId })
    //     const commentc = await this.commentModel.findById(comment._id).populate("track")
    //     track.comments.push(comment._id)
    //     await track.save()
    //     return commentc
    // }
    // // async getComment(dto: CreateCommentDto): Promise<Comment> {
    // //     const comment = await this.commentModel.findById(dto.trackId)
    // //     track.comments.push(comment._id)
    // //     await track.save()
    // //     return comment
    // // }
    // async listen(id: ObjectId) {
    //     const track = await this.trackModel.findById(id)
    //     track.listens += 1
    //     track.save()
    // }

    // async search(query: string): Promise<Track[]> {
    //     const tracks = await this.trackModel.find({
    //         name: { $regex: new RegExp(query, "i") }
    //     })
    //     return tracks
    // }
}