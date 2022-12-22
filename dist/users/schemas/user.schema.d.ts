import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';
import { Playlist } from 'src/playlist/schemas/playlist.schema';
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    password: string;
    username: string;
    picture: string;
    isActivated: boolean;
    activationLink: string;
    liked: Track[];
    likedPlaylists: Playlist[];
    playlists: Playlist[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
