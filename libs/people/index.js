import PeopleRepository from "./repository.js";
import PeopleController from './controller.js'
import PeopleRouter from './router.js';
import mongoClient from "../../db.js";

const peopleRepository = new PeopleRepository(mongoClient);

const peopleController = new PeopleController(peopleRepository);

const peopleRouter = PeopleRouter(peopleController);

export default peopleRouter;
