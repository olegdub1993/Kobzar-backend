import { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import * as mongoose from 'mongoose';
export type TokenDocument = Token & Document;
export declare class Token {
    user: User;
    refreshToken: string;
}
export declare const TokenSchema: mongoose.Schema<Token, mongoose.Model<Token, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Token>;
