import StarshipsRepository from './repository.js'
import StarshipsController from './controller.js'
import StarshipRouter from './router.js';


const starshipRepository = new StarshipsRepository();

const starshipController = new StarshipsController(starshipRepository);

const starshipRouter = StarshipRouter(starshipController);

export default starshipRouter;
