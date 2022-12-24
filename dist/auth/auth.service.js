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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const refreshToken_schema_1 = require("./schemas/refreshToken.schema");
const users_service_1 = require("./../users/users.service");
const jsonwebtoken_1 = require("jsonwebtoken");
const common_2 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(tokenModel, userService) {
        this.tokenModel = tokenModel;
        this.userService = userService;
    }
    async registration(email, password, username, values) {
        const canditate = await this.userService.findByEmail(email);
        if (canditate) {
            throw new common_2.HttpException(`User with ${email} already exist`, 403);
        }
        const user = await this.userService.create(email, password, username);
        const userDto = { id: user._id, email: user.email, username: user.username, isActivated: user.isActivated, liked: user.liked, likedPlaylists: user.likedPlaylists, picture: user.picture, subscriptions: user.subscriptions, subscribers: user.subscribers };
        const tokens = this.generateTokens(userDto, values);
        await this.saveToken(user.id, tokens.refreshToken);
        return Object.assign(Object.assign({}, tokens), { user: userDto });
    }
    async login(email, password, values) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_2.HttpException(`Неправильний пароль або логін`, 403);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new common_2.HttpException(`Неправильний пароль або логін`, 403);
        }
        const userDto = { id: user._id, email: user.email, username: user.username, isActivated: user.isActivated, liked: user.liked, likedPlaylists: user.likedPlaylists, picture: user.picture, subscriptions: user.subscriptions, subscribers: user.subscribers };
        const tokens = this.generateTokens(userDto, values);
        await this.saveToken(user.id, tokens.refreshToken);
        return Object.assign(Object.assign({}, tokens), { user: userDto });
    }
    async refresh(refreshToken, values) {
        if (!refreshToken) {
            throw new common_2.HttpException(`Unauthorized`, 401);
        }
        const userData = this.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new common_2.HttpException(`Unauthorized`, 401);
        }
        const user = await this.userService.findOne(userData.id);
        const userDto = { id: user._id, email: user.email, username: user.username, isActivated: user.isActivated, liked: user.liked, likedPlaylists: user.likedPlaylists, picture: user.picture, subscriptions: user.subscriptions, subscribers: user.subscribers };
        const tokens = this.generateTokens(userDto, values);
        await this.saveToken(user.id, tokens.refreshToken);
        return Object.assign(Object.assign({}, tokens), { user: userDto });
    }
    validateRefreshToken(refreshStr) {
        try {
            const decodedUserData = (0, jsonwebtoken_1.verify)(refreshStr, process.env.REFRESH_SECRET);
            if (typeof decodedUserData === "string") {
                return undefined;
            }
            return decodedUserData;
        }
        catch (error) {
            return null;
        }
    }
    generateTokens(user, values) {
        const accessToken = (0, jsonwebtoken_1.sign)(Object.assign(Object.assign({}, user), values), process.env.ACCESS_SECRET, { expiresIn: "15m" });
        const refreshToken = (0, jsonwebtoken_1.sign)(Object.assign(Object.assign({}, user), values), process.env.REFRESH_SECRET, { expiresIn: "30d" });
        return { refreshToken, accessToken };
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await this.tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = this.tokenModel.create({ user: userId, refreshToken });
        return token;
    }
    async logout(refreshToken) {
        const token = await this.removeToken(refreshToken);
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await this.tokenModel.deleteOne({ refreshToken });
        return tokenData;
    }
    async findToken(refreshToken) {
        const tokenData = await this.tokenModel.findOne({ refreshToken });
        return tokenData;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(refreshToken_schema_1.Token.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map