import { Document } from 'mongoose';
export interface Iarticle extends Document {
    _id: string;
    createdAt?: Date;
    type?: string;
    title?: string;
    subTitle?: string;
    summary?: string;
    author?: string;
    image?: string;
    text?: string;
}
export interface IarticleList extends Document {
    search?: string;
    title?: RegExp;
    type?: RegExp;
}
