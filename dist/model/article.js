"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ArticleSchema = new mongoose_1.Schema({
    createdAt: Date,
    type: String,
    title: String,
    subTitle: String,
    summary: String,
    author: String,
    image: String,
    text: String,
}, { versionKey: false });
ArticleSchema.pre('save', function (next) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.article = mongoose_1.model('Article', ArticleSchema);
//# sourceMappingURL=article.js.map