/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';
export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    @Prop()
    name: string;

    @Prop()
    picture: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }] })
    tracks: Track[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);