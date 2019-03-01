import { Document, model, Schema } from 'mongoose';
import { Iuser } from '../interfaces/user';
import { user } from '../model/user';
export class Register {
    public static async register(json: Iuser): Promise<string> {
        const finduserResult = await user.findOne({ user: json.user });
        if (finduserResult === null) {
            const newUser = new user(json);
            // 这里缺一个存储失败的判断
            newUser.save();
            return new Promise((resolve) => { resolve('success'); });
        } else {
            return new Promise((resolve) => { resolve('failure'); });
        }
    }
}
