import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';
import { User } from 'src/users/schemas/user.schema';
export declare type PlaylistDocument = Playlist & Document;
export declare class Playlist {
    name: string;
    username: string;
    description: string;
    picture: string;
    userPicture: string;
    likes: number;
    tracks: Track[];
    userId: User;
}
export declare const PlaylistSchema: mongoose.Schema<Playlist, mongoose.Model<Playlist, any, any, any, any>, {}, {}, {}, {}, "type", Playlist>;
