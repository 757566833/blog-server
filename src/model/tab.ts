import { Document, Model, model, Schema } from 'mongoose';
const TabSchema: Schema = new Schema({
    tab: String,
    font: String,
}, { versionKey: false });
export const tab: Model<Document> = model<Document>('Tab', TabSchema);
