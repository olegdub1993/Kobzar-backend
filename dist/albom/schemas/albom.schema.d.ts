import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';
export declare type AlbomDocument = Albom & Document;
export declare class Albom {
    name: string;
    username: string;
    description: string;
    picture: string;
    likes: number;
    tracks: Track[];
}
export declare const AlbomSchema: mongoose.Schema<Albom, mongoose.Model<Albom, any, any, any, any>, {}, {}, {}, {}, "type", Albom>;
