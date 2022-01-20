import jwt from "jsonwebtoken";
import {secretKey} from "../../../config/config.js";
import bcrypt from "bcrypt";

export default class UserHelper {

    static createUserFromBody(body) {
        return {
            email: body.email,
            password: body.password,
            confirmPassword: body.confirmPassword
        }
    }

    static createToken(user) {
        return jwt.sign({userId: user._id}, secretKey, {expiresIn: "1h"});
    }

    static encryptPassword(password) {
        return bcrypt.hash(password, 12);
    }

}