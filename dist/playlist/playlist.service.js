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
exports.PlaylistService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const playlist_schema_1 = require("./schemas/playlist.schema");
const file_service_1 = require("../file/file.service");
const user_schema_1 = require("../users/schemas/user.schema");
let PlaylistService = class PlaylistService {
    constructor(playlistModel, userModel, fileService) {
        this.playlistModel = playlistModel;
        this.userModel = userModel;
        this.fileService = fileService;
    }
    async create(userId, dto, picture) {
        let picturePath = "";
        if (picture) {
            picturePath = this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
        }
        const playlist = await this.playlistModel.create(Object.assign(Object.assign({}, dto), { picture: picturePath, likes: 0 }));
        const user = await this.userModel.findById(userId);
        user.playlists.push(playlist._id);
        await user.save();
        return playlist;
    }
    async updatePlaylist(dto, picture) {
        let picturePath = "";
        if (picture) {
            picturePath = this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
        }
        const playlist = await this.playlistModel.findById(dto.id).populate("tracks");
        playlist.name = dto.name;
        playlist.description = dto.description;
        if (picturePath) {
            playlist.picture = picturePath;
        }
        await playlist.save();
        return playlist;
    }
    async getOne(id) {
        const playlist = await this.playlistModel.findById(id).populate("tracks");
        return playlist;
    }
    async getSearchedPlaylists(query) {
        const playlists = await this.playlistModel.find({
            name: { $regex: new RegExp(query, "i") }
        }).populate('tracks');
        return playlists;
    }
    async addTrackToPlaylist(userId, albomId, trackId) {
        const user = await this.userModel.findById(userId);
        const playlist = await this.playlistModel.findById(albomId);
        playlist.tracks.push(trackId);
        await playlist.save();
        return playlist;
    }
    async removeTrackFromPlaylist(userId, albomId, trackId) {
        const playlist = await this.playlistModel.findById(albomId);
        playlist.tracks = playlist.tracks.filter((track) => track.toString() !== trackId);
        await playlist.save();
        return playlist;
    }
    async getAll(count = 100, offset = 0) {
        const playlists = await this.playlistModel.find().skip(offset).limit(count).populate("tracks");
        return playlists;
    }
    async findSome(arrayOfId) {
        const playlists = await this.playlistModel.find({
            '_id': { $in: arrayOfId }
        }).populate("tracks");
        return playlists;
    }
    async addLikes(id) {
        const playlist = await this.playlistModel.findById(id);
        playlist.likes += 1;
        await playlist.save();
        return playlist;
    }
    async removeLikes(id) {
        const playlist = await this.playlistModel.findById(id);
        playlist.likes -= 1;
        await playlist.save();
        return playlist;
    }
    async delete(userId, id) {
        const playlist = await this.playlistModel.findByIdAndDelete(id);
        if (playlist.picture) {
            this.fileService.removeFile(playlist.picture);
        }
        const user = await this.userModel.findById(userId);
        user.playlists = user.playlists.filter((playlist) => playlist.toString() !== id);
        await user.save();
        return playlist._id;
    }
};
PlaylistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(playlist_schema_1.Playlist.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        file_service_1.FileService])
], PlaylistService);
exports.PlaylistService = PlaylistService;
//# sourceMappingURL=playlist.service.js.map