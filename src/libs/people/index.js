import PeopleRepository from "./repository.js";
import PeopleController from './controller.js'
import PeopleRouter from './router.js';

const peopleRepository = new PeopleRepository();

const peopleController = new PeopleController(peopleRepository);

const peopleRouter = PeopleRouter(peopleController);

export default peopleRouter;
