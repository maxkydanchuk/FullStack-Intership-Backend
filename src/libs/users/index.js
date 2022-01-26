import UserRepository from "./repository.js";
import UserController from './controller.js'
import UserRouter from './router.js';

const userRepository = new UserRepository();

const userController = new UserController(userRepository);

const userRouter = UserRouter(userController);

export default userRouter;