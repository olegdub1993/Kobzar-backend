import { Model } from 'mongoose';
import { CommentDocument, Comment } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService } from 'src/file/file.service';
import { PlaylistService } from 'src/playlist/playlist.service';
import { UsersService } from './../users/users.service';
export declare class TrackService {
    private trackModel;
    private commentModel;
    private fileService;
    private playlistService;
    private usersService;
    constructor(trackModel: Model<TrackDocument>, commentModel: Model<CommentDocument>, fileService: FileService, playlistService: PlaylistService, usersService: UsersService);
    create(dto: CreateTrackDto, picture: any, audio: any): Promise<any>;
    getAll(count?: number, offset?: number): Promise<Track[]>;
    getOne(id: ObjectId): Promise<Track>;
    delete(id: ObjectId): Promise<ObjectId>;
    createComment(dto: CreateCommentDto): Promise<Comment>;
    listen(id: ObjectId): Promise<void>;
    search(query: string, type: string): Promise<any>;
}
