import PeopleRepository from "./repository.js";
import PeopleController from './controller.js'
import PeopleRouter from './router.js';
import Person from "./person-model.js";

const peopleRepository = new PeopleRepository(Person);

const peopleController = new PeopleController(peopleRepository);

const peopleRouter = PeopleRouter(peopleController);

export default peopleRouter;
