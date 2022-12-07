/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import * as mongoose from 'mongoose'
export type TokenDocument = Token & Document;

@Schema()
export class Token {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: User;

    @Prop()
    refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

/* eslint-disable prettier/prettier */
// import { sign } from "jsonwebtoken";


// class RefreshToken {
//     constructor(init?: Partial<RefreshToken>) {
//         Object.assign(this, init)
//     }
//     id: number;
//     userId: number;
//     userAgent: string;
//     ipAddress: string;
//     sign(): string {
//         return sign({ ...this }, process.env.REFRESH_SECRET)
//     }
// }

// export default RefreshToken
