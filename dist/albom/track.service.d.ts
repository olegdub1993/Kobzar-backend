import { Model } from 'mongoose';
import { CommentDocument, Comment } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService } from 'src/file/file.service';
export declare class TrackService {
    private trackModel;
    private commentModel;
    private fileService;
    constructor(trackModel: Model<TrackDocument>, commentModel: Model<CommentDocument>, fileService: FileService);
    create(dto: CreateTrackDto, picture: any, audio: any): Promise<Track>;
    getAll(count?: number, offset?: number): Promise<Track[]>;
    getOne(id: ObjectId): Promise<Track>;
    delete(id: ObjectId): Promise<ObjectId>;
    createComment(dto: CreateCommentDto): Promise<Comment>;
    listen(id: ObjectId): Promise<void>;
    search(query: string): Promise<Track[]>;
}
