import { Document, Model, model, Schema } from 'mongoose';
import { Iuser } from '../interfaces/user';
const UserSchema: Schema = new Schema({
  createdAt: Date,
  user: { type: String, required: true },
  password: String,
  isAdmin: Number,
}, { versionKey: false });
UserSchema.pre<Iuser>('save', function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  if (!this.isAdmin) {
    this.isAdmin = 0;
  }
  next();
});

export const user: Model<Document> = model<Document>('User', UserSchema);
