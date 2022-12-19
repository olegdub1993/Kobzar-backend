/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { MailService } from './../mail/mail.service';
import { PlaylistService } from './../playlist/playlist.service';
import { FileService } from 'src/file/file.service';
export declare class UsersService {
    private userModel;
    private readonly playlistService;
    private readonly mailService;
    private fileService;
    constructor(userModel: Model<UserDocument>, playlistService: PlaylistService, mailService: MailService, fileService: FileService);
    findByEmail(email: string): Promise<any>;
    findOne(id: number): Promise<any | undefined>;
    create(email: any, password: any, username: any): Promise<any>;
    updateProfile(userId: any, dto: any, picture: any): Promise<any>;
    activate(activationLink: any): Promise<any>;
    addToLiked(userId: ObjectId, type: string, itemId: any): Promise<any>;
    removeFromLiked(userId: any, type: any, itemId: any): Promise<any>;
    getLiked(userId: ObjectId, type: string): Promise<import("../track/schemas/track.schema").Track[] | Omit<import("../playlist/schemas/playlist.schema").Playlist & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getUserPlaylists(userId: any): Promise<import("../playlist/schemas/playlist.schema").Playlist[]>;
}
