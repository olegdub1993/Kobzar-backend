import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class TrackController {
    private trackService;
    constructor(trackService: TrackService);
    create(files: any, dto: CreateTrackDto): any;
    getAll(count: number, offset: number): any;
    search(query: string): any;
    getOne(id: ObjectId): any;
    delete(id: ObjectId): any;
    createComment(dto: CreateCommentDto): any;
    listen(id: ObjectId): any;
}
