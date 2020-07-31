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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const url_service_1 = require("./url.service");
let UrlController = class UrlController {
    constructor(urlService) {
        this.urlService = urlService;
    }
    async shortenURL(url) {
        return this.urlService.shortenURL(url);
    }
    async getURLs() {
        return this.urlService.getURLs();
    }
};
__decorate([
    common_1.Post('shorten'),
    __param(0, common_1.Body('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "shortenURL", null);
__decorate([
    common_1.Get('fetch'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getURLs", null);
UrlController = __decorate([
    common_1.Controller('urls'),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], UrlController);
exports.UrlController = UrlController;
//# sourceMappingURL=url.controller.js.map