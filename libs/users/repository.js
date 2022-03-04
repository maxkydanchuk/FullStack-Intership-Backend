import {ObjectId} from "mongodb";
import {isValidEmail, isValidPassword} from "../../utils/utils.js";
import bcrypt from "bcrypt";
import UserHelper from "./user-helper/user-helper.js";

export default class UserRepository {
    constructor(repositoryData) {
        this.repositoryData = repositoryData.db('StarWarsDatabase').collection('users');
    }

    async validateRegisterUser (body) {
        const { email, password, confirmPassword  } = body;
        const user = await this.repositoryData.findOne({email: email});

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
        const user = await this.repositoryData.findOne({email: email});

        if (!user) {
            throw new Error ('User does not exist');
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if(!isMatchPassword) {
            throw new Error ('Invalid password');
        }
    }

    async getUser(email) {
        return await this.repositoryData.findOne({email: email})
    }

    async getUserById(id) {
        return await this.repositoryData.findOne({_id: new ObjectId(id)});
    }

    async createUser(body) {
        const { email, password } = body;
        const hashedPassword = await UserHelper.encryptPassword(password)
        const newUser = {email, password: hashedPassword};
        const createItem = await this.repositoryData.insertOne(newUser);

        return await this.getUserById(createItem.insertedId);

    }
}