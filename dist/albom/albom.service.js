"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbomService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const albom_schema_1 = require("./schemas/albom.schema");
const file_service_1 = require("../file/file.service");
const user_schema_1 = require("../users/schemas/user.schema");
let AlbomService = class AlbomService {
    constructor(albomModel, userModel, fileService) {
        this.albomModel = albomModel;
        this.userModel = userModel;
        this.fileService = fileService;
    }
    async create(userId, dto, picture) {
        let picturePath;
        if (picture) {
            picturePath = this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
        }
        const albom = await this.albomModel.create(Object.assign(Object.assign({}, dto), { picture: picturePath, likes: 0 }));
        const user = await this.userModel.findById(userId);
        user.playlists.push(albom._id);
        await user.save();
        return albom;
    }
    async getOne(id) {
        const albom = await this.albomModel.findById(id).populate("tracks");
        return albom;
    }
    async addTrackToAlbom(userId, albomId, trackId) {
        const user = await this.userModel.findById(userId);
        const albom = await this.albomModel.findById(albomId);
        albom.tracks.push(trackId);
        await albom.save();
        return albom;
    }
    async removeTrackFromAlbom(userId, albomId, trackId) {
        const albom = await this.albomModel.findById(albomId);
        albom.tracks = albom.tracks.filter((track) => track.toString() !== trackId);
        await albom.save();
        return albom;
    }
    async getAll(count = 100, offset = 0) {
        const alboms = await this.albomModel.find().skip(offset).limit(count).populate("tracks");
        return alboms;
    }
    async findSome(arrayOfId) {
        const alboms = await this.albomModel.find({
            '_id': { $in: arrayOfId }
        }).populate("tracks");
        return alboms;
    }
    async addLikes(id) {
        const albom = await this.albomModel.findById(id);
        albom.likes += 1;
        await albom.save();
        return albom;
    }
    async removeLikes(id) {
        const albom = await this.albomModel.findById(id);
        albom.likes -= 1;
        await albom.save();
        return albom;
    }
    async delete(id) {
        const playlist = await this.albomModel.findByIdAndDelete(id);
        return playlist._id;
    }
};
AlbomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(albom_schema_1.Albom.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        file_service_1.FileService])
], AlbomService);
exports.AlbomService = AlbomService;
//# sourceMappingURL=albom.service.js.map