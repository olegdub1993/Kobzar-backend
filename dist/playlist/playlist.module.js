"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistModule = void 0;
const common_1 = require("@nestjs/common");
const playlist_conttroller_1 = require("./playlist.conttroller");
const playlist_service_1 = require("./playlist.service");
const mongoose_1 = require("@nestjs/mongoose");
const playlist_schema_1 = require("./schemas/playlist.schema");
const file_service_1 = require("../file/file.service");
const user_schema_1 = require("../users/schemas/user.schema");
const user_schema_2 = require("../users/schemas/user.schema");
let PlaylistModule = class PlaylistModule {
};
PlaylistModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: playlist_schema_1.Playlist.name, schema: playlist_schema_1.PlaylistSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_2.UserSchema }]),
        ],
        controllers: [playlist_conttroller_1.PlaylistController],
        providers: [playlist_service_1.PlaylistService, file_service_1.FileService]
    })
], PlaylistModule);
exports.PlaylistModule = PlaylistModule;
//# sourceMappingURL=playlist.module.js.map