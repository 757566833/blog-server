import { Document, Model, model, Schema } from 'mongoose';
import { Iarticle } from '../interfaces/article';
const ArticleSchema: Schema = new Schema({
    createdAt: Date,
    type: String,
    title: String,
    subTitle: String,
    summary: String,
    author: String,
    image: String,
    text: String,
}, { versionKey: false });
ArticleSchema.pre<Iarticle>('save', function (next) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
export const article: Model<Document> = model<Document>('Article', ArticleSchema);
