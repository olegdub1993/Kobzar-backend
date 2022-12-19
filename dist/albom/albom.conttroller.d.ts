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
import { AlbomService } from './albom.service';
import { CreateAlbomDto } from './dto/create-albom.dto';
import { ObjectId } from 'mongoose';
export declare class AlbomController {
    private albomService;
    constructor(albomService: AlbomService);
    create(request: any, files: any, dto: CreateAlbomDto): Promise<import("./schemas/albom.schema").Albom>;
    addTrackToAlbom(request: any, id: ObjectId, dto: {
        id: string;
    }): Promise<import("./schemas/albom.schema").Albom>;
    removeTrackFromAlbom(request: any, id: ObjectId, dto: {
        id: string;
    }): Promise<import("./schemas/albom.schema").Albom>;
    getAll(count: number, offset: number): Promise<import("./schemas/albom.schema").Albom[]>;
    getOne(id: ObjectId): Promise<import("./schemas/albom.schema").Albom>;
    delete(id: ObjectId): Promise<import("mongoose").Schema.Types.ObjectId>;
}
