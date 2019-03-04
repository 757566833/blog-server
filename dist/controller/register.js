"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
class Register {
    static async register(json) {
        const finduserResult = await user_1.user.findOne({ user: json.user });
        if (finduserResult === null) {
            const newUser = new user_1.user(json);
            // 这里缺一个存储失败的判断
            const result = await newUser.save();
            console.log(result);
            if (result._id) {
                return 0;
            }
            else {
                return new Promise((resolve) => { resolve(-2); });
            }
        }
        else {
            return new Promise((resolve) => { resolve(-1); });
        }
    }
}
exports.Register = Register;
//# sourceMappingURL=register.js.map