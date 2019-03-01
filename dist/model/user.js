"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    createdAt: Date,
    user: { type: String, required: true },
    password: String,
    isAdmin: Number,
}, { versionKey: false });
UserSchema.pre('save', function (next) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    if (!this.isAdmin) {
        this.isAdmin = 0;
    }
    next();
});
exports.user = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=user.js.map