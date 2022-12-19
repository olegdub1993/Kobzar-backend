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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const mail_service_1 = require("./../mail/mail.service");
const playlist_service_1 = require("./../playlist/playlist.service");
const file_service_1 = require("../file/file.service");
let UsersService = class UsersService {
    constructor(userModel, playlistService, mailService, fileService) {
        this.userModel = userModel;
        this.playlistService = playlistService;
        this.mailService = mailService;
        this.fileService = fileService;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (user) {
            return Promise.resolve(user);
        }
        return undefined;
    }
    async findOne(id) {
        const user = await this.userModel.findById(id);
        if (user)
            return user;
        return undefined;
    }
    async create(email, password, username) {
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await this.userModel.create({ email, username, password: hashPassword, activationLink, isActivated: false, picture: "" });
        await this.mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`);
        return user;
    }
    async updateProfile(userId, dto, picture) {
        const user = await this.userModel.findById(userId);
        const picturePath = this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
        if (user.picture) {
            this.fileService.removeFile(user.picture);
        }
        user.picture = picturePath;
        user.username = dto.username;
        await user.save();
        return user;
    }
    async activate(activationLink) {
        const user = await this.userModel.findOne({ activationLink });
        if (!user) {
            throw new common_1.HttpException(`Неправильне посилання`, 403);
        }
        user.isActivated = true;
        await user.save();
    }
    async addToLiked(userId, type, itemId) {
        const user = await this.userModel.findById(userId);
        if (type === "track") {
            user.liked.push(itemId);
        }
        else {
            await this.playlistService.addLikes(itemId);
            user.likedPlaylists.push(itemId);
        }
        await user.save();
        return itemId;
    }
    async removeFromLiked(userId, type, itemId) {
        const user = await this.userModel.findById(userId);
        if (type === "track") {
            user.liked = user.liked.filter((liked) => liked.toString() !== itemId);
        }
        else {
            await this.playlistService.removeLikes(itemId);
            user.likedPlaylists = user.likedPlaylists.filter((likedPlaylist) => likedPlaylist.toString() !== itemId);
        }
        await user.save();
        return itemId;
    }
    async getLiked(userId, type) {
        if (type === "tracks") {
            let user = await this.userModel.findById(userId).populate("liked");
            return user.liked;
        }
        else {
            let user = await this.userModel.findById(userId).populate("likedPlaylists");
            let likedPlaylists = await this.playlistService.findSome(user.likedPlaylists);
            return likedPlaylists;
        }
    }
    async getUserPlaylists(userId) {
        const user = await this.userModel.findById(userId).populate("playlists");
        return user.playlists;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, playlist_service_1.PlaylistService, mail_service_1.MailService, file_service_1.FileService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map