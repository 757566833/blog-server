import { Iuser } from '../interfaces/user';
import { user } from '../model/user';
export class Login {
    public static async login(json: Iuser): Promise<Iuser | null> {
        const userone: Iuser = await user.findOne(json);
        if (userone === null) {
            return null;
        } else {
            return userone;
        }
    }
}
