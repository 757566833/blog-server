import { Document } from 'mongoose';
export interface Itab extends Document {
    _id: string;
    tab?: string;
    font?: string;
}
