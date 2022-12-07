/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>, private fileService: FileService) { }

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const track = await this.trackModel.create({ ...dto, listens: 0, audio: audioPath, picture: picturePath })
        return track
    }

    async getAll(count = 100, offset = 0): Promise<Track[]> {
        const tracks = await this.trackModel.find().skip(offset).limit(count)
        return tracks
    }
    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate("comments")
        return track
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id)
        return track._id
    }
    async createComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.commentModel.create({ username: dto.username, text: dto.text, track: dto.trackId })
        const commentc = await this.commentModel.findById(comment._id).populate("track")
        track.comments.push(comment._id)
        await track.save()
        return commentc
    }
    // async getComment(dto: CreateCommentDto): Promise<Comment> {
    //     const comment = await this.commentModel.findById(dto.trackId)
    //     track.comments.push(comment._id)
    //     await track.save()
    //     return comment
    // }
    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id)
        track.listens += 1
        track.save()
    }

    async search(query: string): Promise<Track[]> {
        if(!query) return []
        const findedTracksByName = await this.trackModel.find({
            name: { $regex: new RegExp(query, "i") }
        })
        const findedTracksByArtist = await this.trackModel.find({
            artist: { $regex: new RegExp(query, "i") }
        })
        findedTracksByArtist.forEach((x)=>{
            const track=findedTracksByName.find((y)=> x._id.toString()===y._id.toString())
            if(!track){
                findedTracksByName.push(x)
            }
        })
        return findedTracksByName
        // return findedTracksByName
    }
}