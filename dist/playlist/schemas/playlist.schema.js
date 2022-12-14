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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistSchema = exports.Playlist = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../../users/schemas/user.schema");
let Playlist = class Playlist {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Playlist.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Playlist.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Playlist.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Playlist.prototype, "picture", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Playlist.prototype, "userPicture", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Playlist.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }] }),
    __metadata("design:type", Array)
], Playlist.prototype, "tracks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: "User" }),
    __metadata("design:type", user_schema_1.User)
], Playlist.prototype, "userId", void 0);
Playlist = __decorate([
    (0, mongoose_1.Schema)()
], Playlist);
exports.Playlist = Playlist;
exports.PlaylistSchema = mongoose_1.SchemaFactory.createForClass(Playlist);
//# sourceMappingURL=playlist.schema.js.map