import { Itab } from '../interfaces/tab';
import { tab } from '../model/tab';

import { Iuser } from '../interfaces/user';
import { user } from '../model/user';

export class Tab {
    public static async tabs(): Promise<Itab[]> {
        const Tabs: Itab[] = await tab.find();
        return Tabs;
    }
    public static async addTab(json: Itab, name: string) {
        const userJson: Iuser = await user.findOne({ user: name });
        if (userJson.isAdmin === 1) {
            const newTab = new tab(json);
            newTab.save();
            return true;
        } else {
            return false;
        }
    }
    public static async deleteTab(json: Itab) {
        return await tab.deleteOne(json);
    }
}
