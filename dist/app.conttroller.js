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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackController = void 0;
const common_1 = require("@nestjs/common");
const track_service_1 = require("./track.service");
const create_track_dto_1 = require("./dto/create-track.dto");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const platform_express_1 = require("@nestjs/platform-express");
let TrackController = class TrackController {
    constructor(trackService) {
        this.trackService = trackService;
    }
    create(files, dto) {
        const { picture, audio } = files;
        return this.trackService.create(dto, picture[0], audio[0]);
    }
    getAll(count, offset) {
        return this.trackService.getAll(count, offset);
    }
    search(query) {
        return this.trackService.search(query);
    }
    getOne(id) {
        return this.trackService.getOne(id);
    }
    delete(id) {
        return this.trackService.delete(id);
    }
    createComment(dto) {
        return this.trackService.createComment(dto);
    }
    listen(id) {
        return this.trackService.listen(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
        ,
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof create_track_dto_1.CreateTrackDto !== "undefined" && create_track_dto_1.CreateTrackDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("count")),
    __param(1, (0, common_1.Query)("offset")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("/search"),
    __param(0, (0, common_1.Query)("query")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "getOne", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("/comment"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_comment_dto_1.CreateCommentDto !== "undefined" && create_comment_dto_1.CreateCommentDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "createComment", null);
__decorate([
    (0, common_1.Post)("/listen/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "listen", null);
TrackController = __decorate([
    (0, common_1.Controller)("/tracks"),
    __metadata("design:paramtypes", [typeof (_a = typeof track_service_1.TrackService !== "undefined" && track_service_1.TrackService) === "function" ? _a : Object])
], TrackController);
exports.TrackController = TrackController;
//# sourceMappingURL=app.conttroller.js.map