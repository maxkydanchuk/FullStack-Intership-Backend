import MoviesRepository from "./repository.js";
import MoviesController from "./controller.js";
import MoviesRouter from "./router.js";

const moviesRepository = new MoviesRepository();

const moviesController = new MoviesController(moviesRepository);

const moviesRouter = MoviesRouter(moviesController);

export default moviesRouter;
