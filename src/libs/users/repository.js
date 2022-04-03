import UserHelper from "./user-helper/user-helper.js";
import User from "./user-model.js";

export default class UserRepository {

    async getUser(email) {
        return await User.findOne({email: email});
    };

    async createUser(body) {
        const { email, password } = body;
        const hashedPassword = await UserHelper.encryptPassword(password);
        const newUser = new User({
            email: email,
            password: hashedPassword,
        });

        return await User.create(newUser);
    }
}