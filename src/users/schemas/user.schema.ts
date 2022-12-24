/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose'
import { Track } from 'src/track/schemas/track.schema';
import { Playlist } from 'src/playlist/schemas/playlist.schema';
export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    username: string;
    
    @Prop()
    picture: string;

    @Prop()
    isActivated: boolean;

    @Prop()
    activationLink: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    subscriptions: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    subscribers: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }] })
    liked: Track[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }] })
    likedPlaylists: Playlist[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }] })
    playlists: Playlist[];
}

export const UserSchema = SchemaFactory.createForClass(User);