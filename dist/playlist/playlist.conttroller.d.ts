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
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { ObjectId } from 'mongoose';
export declare class PlaylistController {
    private albomService;
    constructor(albomService: PlaylistService);
    create(request: any, files: any, dto: CreatePlaylistDto): Promise<import("./schemas/playlist.schema").Playlist>;
    addTrackToPlaylist(request: any, id: ObjectId, dto: {
        id: string;
    }): Promise<import("./schemas/playlist.schema").Playlist>;
    updatePlaylist(files: any, dto: any): Promise<import("./schemas/playlist.schema").Playlist>;
    removeTrackFromPlaylist(request: any, id: ObjectId, dto: {
        id: string;
    }): Promise<import("./schemas/playlist.schema").Playlist>;
    getAll(count: number, offset: number): Promise<import("./schemas/playlist.schema").Playlist[]>;
    getOne(id: ObjectId): Promise<import("./schemas/playlist.schema").Playlist>;
    delete(request: any, id: ObjectId): Promise<import("mongoose").Schema.Types.ObjectId>;
}
