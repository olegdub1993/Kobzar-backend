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
import { UsersService } from './users.service';
import { ObjectId } from 'mongoose';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createSubscription(request: any, dto: {
        id: string;
    }): Promise<any>;
    deleteSubscription(request: any, id: ObjectId): Promise<any>;
    addToLiked(request: any, type: string, dto: {
        id: string;
    }): Promise<any>;
    removeFromLiked(request: any, type: string, id: ObjectId): Promise<any>;
    getLiked(request: any, type: string): Promise<Omit<import("../playlist/schemas/playlist.schema").Playlist & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[] | import("../track/schemas/track.schema").Track[]>;
    getUserPlaylists(request: any): Promise<import("../playlist/schemas/playlist.schema").Playlist[]>;
    getUser(id: ObjectId): Promise<any>;
    updateProfile(files: any, dto: any, request: any): Promise<any>;
}
