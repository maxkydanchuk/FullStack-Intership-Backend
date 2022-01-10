import StarshipsRepository from './repository.js'
import StarshipsController from './controller.js'
import StarshipRouter from './router.js';
import mongoClient from "../../db.js";


const starshipRepository = new StarshipsRepository(mongoClient);

const starshipController = new StarshipsController(starshipRepository);

const starshipRouter = StarshipRouter(starshipController);

export default starshipRouter;
