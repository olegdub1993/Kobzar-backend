/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';
import * as mongoose from 'mongoose'
import { Track } from 'src/track/schemas/track.schema';
export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist {
    @Prop()
    name: string;

    @Prop()
    username: string;

    @Prop()
    description: string;

    @Prop()
    picture: string;

    @Prop()
    likes: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }] })
    tracks: Track[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);