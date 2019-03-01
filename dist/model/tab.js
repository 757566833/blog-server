"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TabSchema = new mongoose_1.Schema({
    tab: String,
    font: String,
}, { versionKey: false });
exports.tab = mongoose_1.model('Tab', TabSchema);
//# sourceMappingURL=tab.js.map