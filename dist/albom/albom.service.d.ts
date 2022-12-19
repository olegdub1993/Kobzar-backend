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
import { Albom, AlbomDocument } from './schemas/albom.schema';
import { CreateAlbomDto } from './dto/create-albom.dto';
import { ObjectId } from 'mongoose';
import { FileService } from 'src/file/file.service';
import { UserDocument } from 'src/users/schemas/user.schema';
export declare class AlbomService {
    private albomModel;
    private userModel;
    private fileService;
    constructor(albomModel: Model<AlbomDocument>, userModel: Model<UserDocument>, fileService: FileService);
    create(userId: any, dto: CreateAlbomDto, picture: any): Promise<Albom>;
    getOne(id: ObjectId): Promise<Albom>;
    addTrackToAlbom(userId: any, albomId: any, trackId: any): Promise<Albom>;
    removeTrackFromAlbom(userId: any, albomId: any, trackId: any): Promise<Albom>;
    getAll(count?: number, offset?: number): Promise<Albom[]>;
    findSome(arrayOfId: any): Promise<Omit<Albom & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    addLikes(id: ObjectId): Promise<Albom>;
    removeLikes(id: ObjectId): Promise<Albom>;
    delete(id: ObjectId): Promise<ObjectId>;
}
