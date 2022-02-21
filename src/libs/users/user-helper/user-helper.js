import jwt from "jsonwebtoken";
import {secretKey} from "../../../config/config.js";
import bcrypt from "bcrypt";

export default class UserHelper {

    static createToken(user) {
        return jwt.sign({userId: user.id}, secretKey, {expiresIn: "1h"});
    };

    static encryptPassword(password) {
        return bcrypt.hash(password, 12);
    };

}