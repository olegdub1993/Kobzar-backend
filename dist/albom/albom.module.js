"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbomModule = void 0;
const common_1 = require("@nestjs/common");
const albom_conttroller_1 = require("./albom.conttroller");
const albom_service_1 = require("./albom.service");
const mongoose_1 = require("@nestjs/mongoose");
const albom_schema_1 = require("./schemas/albom.schema");
const file_service_1 = require("../file/file.service");
const user_schema_1 = require("../users/schemas/user.schema");
const user_schema_2 = require("./../users/schemas/user.schema");
let AlbomModule = class AlbomModule {
};
AlbomModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: albom_schema_1.Albom.name, schema: albom_schema_1.AlbomSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_2.UserSchema }]),
        ],
        controllers: [albom_conttroller_1.AlbomController],
        providers: [albom_service_1.AlbomService, file_service_1.FileService]
    })
], AlbomModule);
exports.AlbomModule = AlbomModule;
//# sourceMappingURL=albom.module.js.map