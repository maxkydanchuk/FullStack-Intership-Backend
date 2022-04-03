import UserHelper from "./user-helper/user-helper.js";

export default class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

     async getUser(req, res) {
        try {
            const body = req.body;
            const {email} = body;
            await this.userRepository.validateLoginUser(body);
            const result = await this.userRepository.getUser(body.email);
            const token = UserHelper.createToken(result).toString();

            return res.status(200).json({token, email})
        } catch (e) {
            return res.status(404).json({error: e.message})
        }
    }

    createUser = async (req, res) => {
        try {
            const body = UserHelper.createUserFromBody(req.body)
            await this.userRepository.validateRegisterUser(body);
            const result = await this.userRepository.createUser(body);

            return res.status(201).json(result);
        } catch (e) {
            return res.status(404).json({error: e.message})
        }
    }
}