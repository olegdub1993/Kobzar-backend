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
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("./schemas/comment.schema");
const track_schema_1 = require("./schemas/track.schema");
const file_service_1 = require("../file/file.service");
const playlist_service_1 = require("../playlist/playlist.service");
const get_audio_duration_1 = require("get-audio-duration");
const path = require("path");
let TrackService = class TrackService {
    constructor(trackModel, commentModel, fileService, playlistService) {
        this.trackModel = trackModel;
        this.commentModel = commentModel;
        this.fileService = fileService;
        this.playlistService = playlistService;
    }
    async create(dto, picture, audio) {
        const audioPath = this.fileService.createFile(file_service_1.FileType.AUDIO, audio);
        const duration = await (0, get_audio_duration_1.getAudioDurationInSeconds)(path.resolve("dist", 'static', audioPath));
        const picturePath = this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
        const track = await this.trackModel.create(Object.assign(Object.assign({}, dto), { listens: 0, audio: audioPath, picture: picturePath, duration }));
        return track;
    }
    async getAll(count = 100, offset = 0) {
        const tracks = await this.trackModel.find().skip(offset).limit(count);
        console.log("t", tracks[0]);
        return tracks;
    }
    async getOne(id) {
        const track = await this.trackModel.findById(id).populate("comments");
        return track;
    }
    async delete(id) {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track._id;
    }
    async createComment(dto) {
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.commentModel.create({ username: dto.username, text: dto.text, track: dto.trackId });
        const commentc = await this.commentModel.findById(comment._id).populate("track");
        track.comments.push(comment._id);
        await track.save();
        return commentc;
    }
    async listen(id) {
        const track = await this.trackModel.findById(id);
        track.listens += 1;
        track.save();
    }
    async search(query, type) {
        if (!query)
            return [];
        if (type === "tracks") {
            const findedTracksByName = await this.trackModel.find({
                name: { $regex: new RegExp(query, "i") }
            });
            const findedTracksByArtist = await this.trackModel.find({
                artist: { $regex: new RegExp(query, "i") }
            });
            findedTracksByArtist.forEach((x) => {
                const track = findedTracksByName.find((y) => x._id.toString() === y._id.toString());
                if (!track) {
                    findedTracksByName.push(x);
                }
            });
            return ({ tracks: findedTracksByName, playlists: [] });
        }
        else if (type === "playlists") {
            const playlists = await this.playlistService.getSearchedPlaylists(query);
            return ({ tracks: [], playlists });
        }
        else {
            const findedTracksByName = await this.trackModel.find({
                name: { $regex: new RegExp(query, "i") }
            });
            const findedTracksByArtist = await this.trackModel.find({
                artist: { $regex: new RegExp(query, "i") }
            });
            findedTracksByArtist.forEach((x) => {
                const track = findedTracksByName.find((y) => x._id.toString() === y._id.toString());
                if (!track) {
                    findedTracksByName.push(x);
                }
            });
            const playlists = await this.playlistService.getSearchedPlaylists(query);
            return ({ tracks: findedTracksByName, playlists });
        }
    }
};
TrackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(track_schema_1.Track.name)),
    __param(1, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        file_service_1.FileService,
        playlist_service_1.PlaylistService])
], TrackService);
exports.TrackService = TrackService;
//# sourceMappingURL=track.service.js.map