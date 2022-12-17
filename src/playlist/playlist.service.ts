/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class PlaylistService {
    constructor(@InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>, 
               @InjectModel(User.name) private userModel: Model<UserDocument>,
      private fileService: FileService) { }

    async create(userId, dto: CreatePlaylistDto,  picture ): Promise<Playlist> {
        let picturePath=""
        if(picture){
          picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        }
        const playlist = await this.playlistModel.create({ ...dto, picture: picturePath, likes:0 })
        const user = await this.userModel.findById(userId)
        user.playlists.push(playlist._id)
        await user.save()
        return playlist
  }
  async updatePlaylist(dto:any, picture ): Promise<Playlist> {
    let picturePath=""
    if(picture){
      picturePath = this.fileService.createFile(FileType.IMAGE, picture)
    }
    const playlist = await this.playlistModel.findById(dto.id).populate("tracks")
    playlist.name=dto.name
    playlist.description=dto.description
    if(picturePath){playlist.picture=picturePath}
    await playlist.save()
    return playlist
}
   async getOne(id: ObjectId): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(id).populate("tracks")
    // // let tracksWithIndex = albom.tracks.map((t,index)=>({...t,index})) 
    // let tracks=albom.tracks;
    // // albom.tracks.map((t,index)=>({...t,index})) 
    // let albomtracks=tracks.map((t,index)=>({...t,index}))
    // console.log(albomtracks)
    return playlist
   }
   async getSearchedPlaylists(query: string): Promise<Playlist[]> {
    const playlists = await this.playlistModel.find({
        name: { $regex: new RegExp(query, "i") }
    }).populate('tracks')
    return playlists
   }
   async addTrackToPlaylist(userId, albomId, trackId): Promise<Playlist> {
    const user = await this.userModel.findById(userId)
    const playlist = await this.playlistModel.findById(albomId)
    playlist.tracks.push(trackId)
    await playlist.save()
    return playlist
}
    async removeTrackFromPlaylist(userId, albomId, trackId): Promise<Playlist> {
        // const user = await this.userModel.findById(userId)
        const playlist = await this.playlistModel.findById(albomId)
        playlist.tracks=playlist.tracks.filter((track)=>track.toString()!==trackId)
        await playlist.save()
        return playlist
    }
async getAll(count = 100, offset = 0): Promise<Playlist[]> {
    const playlists = await this.playlistModel.find().skip(offset).limit(count).populate("tracks")
    return playlists
}
async findSome(arrayOfId) {
    const playlists = await this.playlistModel.find({
        '_id': { $in: arrayOfId}
    }).populate("tracks")
    return playlists
}

  async addLikes(id: ObjectId): Promise<Playlist> {
        const playlist = await this.playlistModel.findById(id)
        playlist.likes+=1
        await playlist.save()
        return playlist
    }
    async removeLikes(id: ObjectId): Promise<Playlist> {
        const playlist = await this.playlistModel.findById(id)
        playlist.likes-=1
        await playlist.save()
        return playlist
    }
    // async getOne(id: ObjectId): Promise<Track> {
    //     const track = await this.trackModel.findById(id).populate("comments")
    //     return track
    // }

    async delete(userId:ObjectId, id): Promise<ObjectId> {
        const playlist = await this.playlistModel.findByIdAndDelete(id)
        if(playlist.picture){
            this.fileService.removeFile(playlist.picture)
        }
        const user = await this.userModel.findById(userId)
        user.playlists= user.playlists.filter((playlist)=>playlist.toString() !== id)
        await user.save()
        return playlist._id
    }
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