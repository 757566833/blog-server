"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tab_1 = require("../model/tab");
const user_1 = require("../model/user");
class Tab {
    static async tabs() {
        const Tabs = await tab_1.tab.find();
        return Tabs;
    }
    static async addTab(json, name) {
        const userJson = await user_1.user.findOne({ user: name });
        if (userJson.isAdmin === 1) {
            const newTab = new tab_1.tab(json);
            newTab.save();
            return true;
        }
        else {
            return false;
        }
    }
    static async deleteTab(json) {
        return await tab_1.tab.deleteOne(json);
    }
}
exports.Tab = Tab;
//# sourceMappingURL=tab.js.map