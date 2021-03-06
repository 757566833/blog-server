"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = require("../model/article");
class Article {
    static async getArticle(json) {
        const ArticleOne = await article_1.article.findOne(json);
        return ArticleOne;
    }
    static async addArticle(json) {
        const newArticle = new article_1.article(json);
        newArticle.save();
    }
    static async updateArticle(id, json, author) {
        // const ArticleOne: Iarticle = await article.findByIdAndUpdate(id, json);
        const ArticleOne = await article_1.article.findById(id);
        if (author === ArticleOne.author) {
            const result = await article_1.article.findByIdAndUpdate(id, json);
            return result;
        }
        else {
            return undefined;
        }
    }
    static async deleteArticle(json) {
        const newArticle = new article_1.article(json);
        newArticle.save();
    }
    static async ArticleList(json) {
        if (json.search) {
            json.title = new RegExp(json.search, 'g');
        }
        json.type = new RegExp(json.type, 'g');
        delete json.search;
        const ArticleList = await article_1.article.find(json, 'type title subTitle summary author createdAt');
        return ArticleList;
    }
}
exports.Article = Article;
//# sourceMappingURL=article.js.map