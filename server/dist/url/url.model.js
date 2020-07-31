"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlSchema = void 0;
const mongoose = require("mongoose");
exports.UrlSchema = new mongoose.Schema({
    original: { type: String, required: true },
    shortened: { type: String, required: true },
});
//# sourceMappingURL=url.model.js.map