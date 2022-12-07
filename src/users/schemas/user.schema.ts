/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose'
import { Track } from 'src/track/schemas/track.schema';
import { Albom } from 'src/albom/schemas/albom.schema';
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

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }] })
    liked: Track[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Albom" }] })
    alboms: Albom[];
}

export const UserSchema = SchemaFactory.createForClass(User);