import { Iuser } from '../interfaces/user';
import { user } from '../model/user';
export class Register {
    public static async register(json: Iuser): Promise<number> {
        const finduserResult = await user.findOne({ user: json.user });
        if (finduserResult === null) {
            const newUser = new user(json);
            // 这里缺一个存储失败的判断
            const result = await newUser.save();
            console.log(result);
            if (result._id) {
                return 0;
            } else {
                return new Promise((resolve) => { resolve(-2); });
            }
        } else {
            return new Promise((resolve) => { resolve(-1); });
        }
    }
}
