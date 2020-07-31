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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const RandString = require("randomatic");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UrlService = class UrlService {
    constructor(urlModel) {
        this.urlModel = urlModel;
    }
    async shortenURL(url) {
        const shortened = this.generateResource();
        const urlBody = new this.urlModel({
            original: url,
            shortened: `https://pbid.io/${shortened}`,
        });
        let res;
        try {
            res = await urlBody.save();
            console.log(res);
            return res;
        }
        catch (error) {
            return error;
        }
    }
    async getURLs() {
        const urls = await this.urlModel.find().exec();
        return [...urls];
    }
    generateResource() {
        return RandString('a0a0', 8);
    }
};
UrlService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('URL')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=url.service.js.map