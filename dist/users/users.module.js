"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const mail_service_1 = require("./../mail/mail.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const playlist_schema_1 = require("./../playlist/schemas/playlist.schema");
const playlist_service_1 = require("./../playlist/playlist.service");
const user_schema_2 = require("./schemas/user.schema");
const file_service_1 = require("../file/file.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_2.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: playlist_schema_1.Playlist.name, schema: playlist_schema_1.PlaylistSchema }]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, mail_service_1.MailService, file_service_1.FileService, playlist_service_1.PlaylistService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map