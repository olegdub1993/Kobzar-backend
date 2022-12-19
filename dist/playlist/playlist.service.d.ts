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
import { Model } from 'mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { ObjectId } from 'mongoose';
import { FileService } from 'src/file/file.service';
import { UserDocument } from 'src/users/schemas/user.schema';
export declare class PlaylistService {
    private playlistModel;
    private userModel;
    private fileService;
    constructor(playlistModel: Model<PlaylistDocument>, userModel: Model<UserDocument>, fileService: FileService);
    create(userId: any, dto: CreatePlaylistDto, picture: any): Promise<Playlist>;
    updatePlaylist(dto: any, picture: any): Promise<Playlist>;
    getOne(id: ObjectId): Promise<Playlist>;
    getSearchedPlaylists(query: string): Promise<Playlist[]>;
    addTrackToPlaylist(userId: any, albomId: any, trackId: any): Promise<Playlist>;
    removeTrackFromPlaylist(userId: any, albomId: any, trackId: any): Promise<Playlist>;
    getAll(count?: number, offset?: number): Promise<Playlist[]>;
    findSome(arrayOfId: any): Promise<Omit<Playlist & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    addLikes(id: ObjectId): Promise<Playlist>;
    removeLikes(id: ObjectId): Promise<Playlist>;
    delete(userId: ObjectId, id: any): Promise<ObjectId>;
}
