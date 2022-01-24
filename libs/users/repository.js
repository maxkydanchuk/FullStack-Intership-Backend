import {isValidEmail, isValidPassword} from "../../utils/utils.js";
import bcrypt from "bcrypt";
import UserHelper from "./user-helper/user-helper.js";
import User from "./user-model.js";

export default class UserRepository {

    async validateRegisterUser (body) {
        const { email, password, confirmPassword  } = body;
        const user = await User.findOne({email: email});

        if(user) {
            throw new Error('user with this email is already exists')
        }

        if(!isValidEmail(email)) {
            throw new Error('Email should be valid email e.g. user@example.com')
        }

        if(!isValidPassword(password)) {
            throw new Error('Password should be at least 8 characters with 1 Upper Case, 1 Lower Case and at least 1 number')
        }

        if(password !== confirmPassword) {
            throw new Error ("Passwords didn't match")
        }
        return true
    }

    async validateLoginUser(body) {
        const { email, password } = body;
        const user = await User.findOne({email: email});

        if (!user) {
            throw new Error ('User does not exist');
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if(!isMatchPassword) {
            throw new Error ('Invalid password');
        }
    }

    async getUser(email) {
        return await User.findOne({email: email})
    }

    async createUser(body) {
        const { email, password } = body;
        const hashedPassword = await UserHelper.encryptPassword(password)
        const newUser = new User({
            email: email,
            password: hashedPassword,
        })

        return await newUser.save();
    }
}