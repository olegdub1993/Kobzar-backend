import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';
export type PlaylistDocument = Playlist & Document;
export declare class Playlist {
    name: string;
    username: string;
    description: string;
    picture: string;
    likes: number;
    tracks: Track[];
}
export declare const PlaylistSchema: mongoose.Schema<Playlist, mongoose.Model<Playlist, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Playlist>;
