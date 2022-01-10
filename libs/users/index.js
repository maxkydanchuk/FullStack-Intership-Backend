import UserRepository from "./repository.js";
import UserController from './controller.js'
import UserRouter from './router.js';
import mongoClient from "../../db.js";

const userRepository = new UserRepository(mongoClient);

const userController = new UserController(userRepository);

const userRouter = UserRouter(userController);

export default userRouter;