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
import { PlaylistService } from 'src/playlist/playlist.service';
import { getAudioDurationInSeconds }  from 'get-audio-duration';
import * as path from "path"
import { UsersService } from './../users/users.service';
import { Artist, ArtistDocument } from 'src/artist/schemas/artist.schema';
import { ArtistService } from 'src/artist/artist.service';

import { translitDictLtoC, translitDictCtoL } from './dictionary';


@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
              @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
              @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
         private fileService: FileService,
         private playlistService: PlaylistService,
         private artistService: ArtistService,
         private usersService: UsersService
         ) { }

    async create({artists, ...dto}: CreateTrackDto, picture, audio): Promise<any> {
        const [localAudioPath, absoluteAudioPath] =await this.fileService.createFile(FileType.AUDIO, audio)
        // in case of saving files on server
        // const duration= await getAudioDurationInSeconds(path.resolve("dist", 'static',audioPath))
        const duration= await getAudioDurationInSeconds(absoluteAudioPath)
        const [localImagePath] = await this.fileService.createFile(FileType.IMAGE, picture)
        let artistsParsed= JSON.parse(artists);
        const track = await this.trackModel.create({ ...dto, artists:artistsParsed, listens: 0, audio: localAudioPath, picture: localImagePath ,duration})
        artistsParsed.forEach(async id => {
        const artist = await this.artistModel.findById(id)
        artist.tracks.push(track._id)
        await artist.save()   
        });
        return track
    }

    async getAll(count = 100, offset = 0): Promise<Track[]> {
        const tracks = await this.trackModel.find().skip(offset).limit(count).populate("artists")
        // tracks.forEach(async(track)=>{
        //     const duration= await getAudioDurationInSeconds(path.resolve("dist", 'static',track.audio))
        //     track.duration=duration
        //     await track.save() 
        // })
        return tracks
    }
    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate("comments").populate("artists")
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
   
    async search(query: string,type:string): Promise<any> {  
        const detectCharacterScript=(query) => {
            const latinRegex = /[A-Za-z]/;
            const cyrillicRegex = /[А-Яа-я]/;
            if (latinRegex.test(query)) {
              return 'latin';
            } else if (cyrillicRegex.test(query)) {
              return 'cyrillic';
            } else {
              return 'unknown';
            }
          }
        let queryType= detectCharacterScript(query)
        let translitDict =queryType==="latin"?translitDictLtoC:translitDictCtoL
        const transliteratedQuery = query.toLowerCase().split('').map(char => translitDict[char] || char).join('');
        if(!query) return []
        if(type==="tracks"){
        const findedTracksByName = await this.trackModel.find({
            name: { $regex: new RegExp(query, "i") }
        }).populate("artists")
        const findedTracksByArtist= await this.trackModel.find({
            artists: {
              $in: await this.artistModel.find({
                name: {
                  $regex: new RegExp(`(${query}|${transliteratedQuery})`, 'i')
                }
              }).distinct('_id')
            }
          }).populate('artists');

        findedTracksByArtist.forEach((x)=>{
            const track=findedTracksByName.find((y)=> x._id.toString()===y._id.toString())
            if(!track){
                findedTracksByName.push(x)
            }
        })
        return ({tracks: findedTracksByName,playlists:[],users:[],artists:[]})
    }else if(type==="playlists"){
        const playlists = await this.playlistService.getSearchedPlaylists(query)
         return ({tracks:[],playlists,users:[],artists:[]})

     } else if(type==="artists"){
        const artists = await this.artistService.getSearchedArtists(query,transliteratedQuery)
         return ({tracks:[],playlists:[],users:[],artists})

     }else if(type==="users"){
        const users = await this.usersService.getSearchedUsers(query)
         return ({tracks:[],playlists:[], artists:[], users})
     }
     else {
        const findedTracksByName = await this.trackModel.find({
            name: { $regex: new RegExp(query, "i") }
        }).populate("artists")
        const findedTracksByArtist = await this.trackModel.find({
            artists: {
              $in: await this.artistModel.find({
                name: {
                  $regex:new RegExp(`(${query}|${transliteratedQuery})`, 'i'),
                }
              }).distinct('_id')
            }
          }).populate('artists');
        findedTracksByArtist.forEach((x)=>{
            const track=findedTracksByName.find((y)=> x._id.toString()===y._id.toString())
            if(!track){
                findedTracksByName.push(x)
            }
        })
        const playlists = await this.playlistService.getSearchedPlaylists(query)
        const users = await this.usersService.getSearchedUsers(query)
        const artists = await this.artistService.getSearchedArtists(query,transliteratedQuery)
        return ({tracks:findedTracksByName,playlists, users, artists})
     }
}
}