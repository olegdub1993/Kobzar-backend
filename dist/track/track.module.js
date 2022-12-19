"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackModule = void 0;
const common_1 = require("@nestjs/common");
const track_conttroller_1 = require("./track.conttroller");
const track_service_1 = require("./track.service");
const mongoose_1 = require("@nestjs/mongoose");
const track_schema_1 = require("./schemas/track.schema");
const comment_schema_1 = require("./schemas/comment.schema");
const file_service_1 = require("../file/file.service");
const playlist_service_1 = require("../playlist/playlist.service");
const playlist_schema_1 = require("./../playlist/schemas/playlist.schema");
const user_schema_1 = require("../users/schemas/user.schema");
let TrackModule = class TrackModule {
};
TrackModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: track_schema_1.Track.name, schema: track_schema_1.TrackSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: comment_schema_1.Comment.name, schema: comment_schema_1.CommentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: playlist_schema_1.Playlist.name, schema: playlist_schema_1.PlaylistSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
        ],
        controllers: [track_conttroller_1.TrackController],
        providers: [track_service_1.TrackService, playlist_service_1.PlaylistService, file_service_1.FileService]
    })
], TrackModule);
exports.TrackModule = TrackModule;
//# sourceMappingURL=track.module.js.map