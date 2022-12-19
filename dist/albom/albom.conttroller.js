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
exports.AlbomController = void 0;
const common_1 = require("@nestjs/common");
const albom_service_1 = require("./albom.service");
const create_albom_dto_1 = require("./dto/create-albom.dto");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AlbomController = class AlbomController {
    constructor(albomService) {
        this.albomService = albomService;
    }
    create(request, files, dto) {
        const userId = request.user.userId;
        let picture;
        if (files.picture) {
            picture = files.picture[0];
        }
        return this.albomService.create(userId, dto, picture);
    }
    addTrackToAlbom(request, id, dto) {
        const userId = request.user.userId;
        return this.albomService.addTrackToAlbom(userId, id, dto.id);
    }
    removeTrackFromAlbom(request, id, dto) {
        const userId = request.user.userId;
        return this.albomService.removeTrackFromAlbom(userId, id, dto.id);
    }
    getAll(count, offset) {
        return this.albomService.getAll(count, offset);
    }
    getOne(id) {
        return this.albomService.getOne(id);
    }
    delete(id) {
        return this.albomService.delete(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'picture', maxCount: 1 },
        ,
    ])),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_albom_dto_1.CreateAlbomDto]),
    __metadata("design:returntype", void 0)
], AlbomController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(":id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AlbomController.prototype, "addTrackToAlbom", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AlbomController.prototype, "removeTrackFromAlbom", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("count")),
    __param(1, (0, common_1.Query)("offset")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AlbomController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AlbomController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AlbomController.prototype, "delete", null);
AlbomController = __decorate([
    (0, common_1.Controller)("alboms"),
    __metadata("design:paramtypes", [albom_service_1.AlbomService])
], AlbomController);
exports.AlbomController = AlbomController;
//# sourceMappingURL=albom.conttroller.js.map