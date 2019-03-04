import { Iarticle, IarticleList } from '../interfaces/article';
import { article } from '../model/article';
export class Article {
    public static async getArticle(json: Iarticle) {
        const ArticleOne: Iarticle = await article.findOne(json);
        return ArticleOne;
    }
    public static async addArticle(json: Iarticle) {
        const newArticle = new article(json);
        newArticle.save();
    }
    public static async updateArticle(id: string, json: Iarticle) {
        const ArticleOne: Iarticle = await article.findByIdAndUpdate(id, json);
        return ArticleOne;
    }
    public static async deleteArticle(json: Iarticle) {
        const newArticle = new article(json);
        newArticle.save();
    }
    public static async ArticleList(json: IarticleList): Promise<Iarticle[]> {
        if (json.search) {
            json.title = new RegExp(json.search, 'g');
        }
        json.type = new RegExp(json.type, 'g');
        delete json.search;
        const ArticleList: Iarticle[] = await article.find(json, 'type title subTitle summary author createdAt');
        return ArticleList;
    }
}
