import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from './track.schema';
export declare type CommentDocument = Comment & Document;
export declare class Comment {
    username: string;
    text: string;
    track: Track;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, any>, {}, {}, {}, {}, "type", Comment>;
