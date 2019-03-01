"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
class Login {
    static async login(json) {
        const userone = await user_1.user.findOne(json);
        if (userone === null) {
            return null;
        }
        else {
            return userone;
        }
    }
}
exports.Login = Login;
//# sourceMappingURL=login.js.map