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
