import { Document } from 'mongoose';
export interface Iuser extends Document {
    _id: string;
    createdAt?: Date;
    user?: string;
    password?: string;
    isAdmin?: number;
}
